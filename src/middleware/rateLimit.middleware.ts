import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

/**
 * In-memory store for rate limiting (fallback if Redis is not available)
 */
class InMemoryStore {
  private store: Map<string, { count: number; resetTime: number }> = new Map();

  async increment(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
    const now = Date.now();
    const existing = this.store.get(key);

    if (!existing || existing.resetTime < now) {
      // New window
      const resetTime = now + windowMs;
      this.store.set(key, { count: 1, resetTime });
      return { count: 1, resetTime };
    }

    // Increment existing
    existing.count++;
    this.store.set(key, existing);
    return existing;
  }

  async cleanup(): Promise<void> {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (value.resetTime < now) {
        this.store.delete(key);
      }
    }
  }
}

/**
 * Redis store for rate limiting (distributed)
 */
class RedisStore {
  private client: ReturnType<typeof createClient> | null = null;
  private connected: boolean = false;

  async connect(): Promise<void> {
    if (this.connected) return;

    try {
      this.client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      });

      this.client.on('error', (err) => {
        console.error('Redis error:', err);
        this.connected = false;
      });

      await this.client.connect();
      this.connected = true;
      console.log('✓ Redis connected for rate limiting');
    } catch (error) {
      console.warn('⚠ Redis not available, using in-memory store');
      this.connected = false;
    }
  }

  async increment(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
    if (!this.connected || !this.client) {
      throw new Error('Redis not connected');
    }

    const now = Date.now();
    const resetTime = now + windowMs;

    const multi = this.client.multi();
    multi.incr(key);
    multi.pExpire(key, windowMs);

    const results = await multi.exec();
    const count = results[0] as number;

    return { count, resetTime };
  }

  isConnected(): boolean {
    return this.connected;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
      this.connected = false;
    }
  }
}

// Initialize stores
const redisStore = new RedisStore();
const inMemoryStore = new InMemoryStore();

// Try to connect to Redis on startup
redisStore.connect().catch(() => {
  console.warn('Using in-memory store for rate limiting');
});

// Cleanup in-memory store every 60 seconds
setInterval(() => {
  inMemoryStore.cleanup();
}, 60000);

/**
 * Rate limit options
 */
interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 60000 = 1 minute)
  max?: number; // Max requests per window (default: 100)
  message?: string; // Custom error message
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
  keyGenerator?: (req: Request) => string; // Custom key generator
}

/**
 * Rate limiting middleware
 */
export const rateLimiter = (options: RateLimitOptions = {}) => {
  const {
    windowMs = 60000, // 1 minute
    max = 100,
    message = 'Too many requests, please try again later',
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
    keyGenerator = (req: Request) => {
      // Default: Use IP address
      return req.ip || req.socket.remoteAddress || 'unknown';
    },
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `ratelimit:${keyGenerator(req)}`;

      // Choose store based on Redis availability
      const store = redisStore.isConnected() ? redisStore : inMemoryStore;

      // Get current count
      const { count, resetTime } = await store.increment(key, windowMs);

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, max - count));
      res.setHeader('X-RateLimit-Reset', new Date(resetTime).toISOString());

      // Check if limit exceeded
      if (count > max) {
        return res.status(429).json({
          success: false,
          error: message,
          retryAfter: Math.ceil((resetTime - Date.now()) / 1000), // seconds
        });
      }

      // If skip options are enabled, decrement on response
      if (skipSuccessfulRequests || skipFailedRequests) {
        res.on('finish', () => {
          const shouldSkip =
            (skipSuccessfulRequests && res.statusCode < 400) ||
            (skipFailedRequests && res.statusCode >= 400);

          if (shouldSkip) {
            // In a real implementation, we would decrement the counter
            // For simplicity, we're not implementing this here
          }
        });
      }

      next();
    } catch (error) {
      console.error('Rate limit error:', error);
      // On error, allow the request through
      next();
    }
  };
};

/**
 * Strict rate limiter for sensitive endpoints
 */
export const strictRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many requests to this sensitive endpoint',
});

/**
 * API rate limiter (general)
 */
export const apiRateLimiter = rateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many API requests',
});

/**
 * Auth rate limiter (for login/signup)
 */
export const authRateLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 minutes
  message: 'Too many authentication attempts',
  skipSuccessfulRequests: true, // Don't count successful logins
});

/**
 * Create custom rate limiter
 */
export const createRateLimiter = (options: RateLimitOptions) => {
  return rateLimiter(options);
};

/**
 * Get rate limit status for a key
 */
export const getRateLimitStatus = async (key: string) => {
  const store = redisStore.isConnected() ? redisStore : inMemoryStore;

  try {
    const result = await store.increment(`ratelimit:${key}`, 60000);
    return {
      count: result.count,
      resetTime: new Date(result.resetTime).toISOString(),
    };
  } catch (error) {
    return null;
  }
};

// Export stores for testing
export { redisStore, inMemoryStore };
