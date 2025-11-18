import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  BookOpenIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../services/store';
import { sessionAPI, journalAPI } from '../services/api';
import type { Session } from '../types';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, sessionsRes] = await Promise.all([
        sessionAPI.getStats(),
        sessionAPI.getAll({ limit: 5 }),
      ]);

      setStats(statsRes.data.data);
      setRecentSessions(sessionsRes.data.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Rozpocznij sesję',
      description: 'Nowa sesja oddechowa',
      icon: HeartIcon,
      href: '/session',
      color: 'from-primary-600 to-primary-700',
    },
    {
      title: 'Dziennik',
      description: 'Zapisz swoje doświadczenia',
      icon: BookOpenIcon,
      href: '/journal',
      color: 'from-gold-500 to-gold-600',
    },
  ];

  const statCards = [
    {
      label: 'Całkowity czas praktyki',
      value: stats?.totalHours ? `${stats.totalHours}h` : '0h',
      icon: ClockIcon,
    },
    {
      label: 'Ukończone sesje',
      value: stats?.completedSessions || 0,
      icon: ChartBarIcon,
    },
    {
      label: 'Średnia ocena',
      value: stats?.averageRating ? `${stats.averageRating}/10` : 'N/A',
      icon: HeartIcon,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container-custom">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-dark-text mb-2">
            Witaj, {user?.firstName}! 🫁
          </h1>
          <p className="text-dark-text-secondary">
            Gotowy na kolejną sesję oddechową?
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={action.href}
                  className={`block card-elevated hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${action.color}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-white/10 rounded-xl">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {action.title}
                      </h3>
                      <p className="text-white/80">{action.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark-text-secondary mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-dark-text">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 bg-primary-600/20 rounded-xl">
                    <Icon className="h-8 w-8 text-primary-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-dark-text mb-6">
            Ostatnie sesje
          </h2>

          {recentSessions.length === 0 ? (
            <div className="text-center py-12">
              <HeartIcon className="h-16 w-16 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text-secondary">
                Nie masz jeszcze żadnych sesji
              </p>
              <Link to="/session" className="btn-primary mt-4 inline-block">
                Rozpocznij pierwszą sesję
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 bg-dark-elevated rounded-lg border border-dark-border hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            session.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : session.status === 'in_progress'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {session.status === 'completed'
                            ? 'Ukończona'
                            : session.status === 'in_progress'
                            ? 'W trakcie'
                            : 'Zaplanowana'}
                        </span>
                        <span className="text-sm text-dark-text-secondary">
                          {new Date(session.startTime).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                      <p className="mt-2 text-dark-text">
                        <span className="font-medium capitalize">
                          {session.intensity === 'gentle'
                            ? 'Łagodna'
                            : session.intensity === 'medium'
                            ? 'Średnia'
                            : 'Głęboka'}
                        </span>{' '}
                        • {session.duration} min
                      </p>
                    </div>
                    <ClockIcon className="h-6 w-6 text-dark-text-secondary" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
