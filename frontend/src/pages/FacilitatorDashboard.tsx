import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { facilitatorAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function FacilitatorDashboard() {
  const [groupSessions, setGroupSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGroupSessions();
  }, []);

  const loadGroupSessions = async () => {
    try {
      const response = await facilitatorAPI.getGroupSessions();
      setGroupSessions(response.data.data);
    } catch (error) {
      toast.error('Błąd podczas ładowania sesji grupowych');
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-text">Panel facilitatora</h1>
            <p className="text-dark-text-secondary mt-1">
              Zarządzaj sesjami grupowymi i monitoruj uczestników
            </p>
          </div>
          <button className="btn-primary">
            <PlusIcon className="h-5 w-5 inline mr-2" />
            Nowa sesja grupowa
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-text-secondary mb-1">
                  Nadchodzące sesje
                </p>
                <p className="text-3xl font-bold text-dark-text">
                  {groupSessions.filter(s => s.status === 'scheduled' || s.status === 'open_for_registration').length}
                </p>
              </div>
              <div className="p-3 bg-primary-600/20 rounded-xl">
                <CalendarIcon className="h-8 w-8 text-primary-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-text-secondary mb-1">
                  Całkowita liczba uczestników
                </p>
                <p className="text-3xl font-bold text-dark-text">
                  {groupSessions.reduce((sum, s) => sum + s.currentParticipants, 0)}
                </p>
              </div>
              <div className="p-3 bg-gold-500/20 rounded-xl">
                <UserGroupIcon className="h-8 w-8 text-gold-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-text-secondary mb-1">
                  Ukończone sesje
                </p>
                <p className="text-3xl font-bold text-dark-text">
                  {groupSessions.filter(s => s.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CalendarIcon className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Group Sessions List */}
        <div className="card">
          <h2 className="text-2xl font-bold text-dark-text mb-6">
            Twoje sesje grupowe
          </h2>

          {groupSessions.length === 0 ? (
            <div className="text-center py-12">
              <UserGroupIcon className="h-16 w-16 text-dark-text-secondary mx-auto mb-4" />
              <p className="text-dark-text-secondary mb-4">
                Nie masz jeszcze żadnych sesji grupowych
              </p>
              <button className="btn-primary">
                Utwórz pierwszą sesję
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {groupSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-6 bg-dark-elevated rounded-lg border border-dark-border hover:border-primary-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-dark-text">
                        {session.name}
                      </h3>
                      <p className="text-sm text-dark-text-secondary mt-1">
                        {new Date(session.scheduledDate).toLocaleDateString('pl-PL', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : session.status === 'in_progress'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gold-500/20 text-gold-400'
                      }`}
                    >
                      {session.status === 'completed'
                        ? 'Ukończona'
                        : session.status === 'in_progress'
                        ? 'W trakcie'
                        : 'Zaplanowana'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-dark-text-secondary">Uczestnicy</p>
                      <p className="text-dark-text font-medium">
                        {session.currentParticipants} / {session.maxParticipants}
                      </p>
                    </div>
                    <div>
                      <p className="text-dark-text-secondary">Czas trwania</p>
                      <p className="text-dark-text font-medium">{session.duration} min</p>
                    </div>
                    <div>
                      <p className="text-dark-text-secondary">Intensywność</p>
                      <p className="text-dark-text font-medium capitalize">
                        {session.intensity === 'gentle'
                          ? 'Łagodna'
                          : session.intensity === 'medium'
                          ? 'Średnia'
                          : 'Głęboka'}
                      </p>
                    </div>
                    <div>
                      <p className="text-dark-text-secondary">Typ</p>
                      <p className="text-dark-text font-medium capitalize">
                        {session.sessionType === 'in_person'
                          ? 'Stacjonarna'
                          : session.sessionType === 'remote'
                          ? 'Zdalna'
                          : 'Hybrydowa'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    <button className="btn-primary flex-1">
                      Zobacz szczegóły
                    </button>
                    {session.status === 'in_progress' && (
                      <button className="btn-outline flex-1">
                        Dashboard sesji
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
