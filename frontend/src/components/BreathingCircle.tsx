import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BreathingCircleProps {
  phase: 'inhale' | 'hold' | 'exhale';
  duration: number;
  onPhaseComplete?: () => void;
}

export default function BreathingCircle({
  phase,
  duration,
  onPhaseComplete,
}: BreathingCircleProps) {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    setCountdown(duration);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onPhaseComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, duration, onPhaseComplete]);

  const getPhaseConfig = () => {
    switch (phase) {
      case 'inhale':
        return {
          scale: 1.5,
          color: 'from-primary-500 to-gold-400',
          text: 'Wdech',
          instruction: 'Powoli wdychaj przez nos',
        };
      case 'hold':
        return {
          scale: 1.5,
          color: 'from-gold-400 to-gold-500',
          text: 'Zatrzymaj',
          instruction: 'Zatrzymaj oddech',
        };
      case 'exhale':
        return {
          scale: 1,
          color: 'from-primary-700 to-primary-900',
          text: 'Wydech',
          instruction: 'Powoli wypuszczaj powietrze',
        };
    }
  };

  const config = getPhaseConfig();

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Main breathing circle */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className={`w-64 h-64 rounded-full bg-gradient-to-br ${config.color} shadow-2xl flex items-center justify-center`}
          animate={{
            scale: config.scale,
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: duration,
            ease: 'easeInOut',
          }}
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-white mb-2">
              {countdown}
            </div>
            <div className="text-xl font-medium text-white/90">
              {config.text}
            </div>
          </div>
        </motion.div>

        {/* Outer rings */}
        <motion.div
          className="absolute w-80 h-80 rounded-full border-4 border-primary-500/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: duration,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full border-2 border-primary-400/20"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: duration,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Instruction text */}
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xl text-dark-text font-medium">
          {config.instruction}
        </p>
      </motion.div>
    </div>
  );
}
