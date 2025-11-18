import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { mockVestingSchedules } from '../data/mockData';

const Vesting: React.FC = () => {
  const schedules = mockVestingSchedules;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fully_unlocked':
        return 'bg-green-900 text-green-200';
      case 'partially_unlocked':
        return 'bg-yellow-900 text-yellow-200';
      case 'locked':
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'fully_unlocked':
        return 'Pełny dostęp';
      case 'partially_unlocked':
        return 'Częściowo odblokowane';
      case 'locked':
        return 'Zablokowane';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Vesting</h1>
        <p className="text-slate-400">Harmonogramy odblokowywania akcji dla akcjonariuszy</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faLockOpen} className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Aktywne harmonogramy</p>
              <p className="text-2xl font-bold text-white">{schedules.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Odblokowane akcje</p>
              <p className="text-2xl font-bold text-white">
                {schedules.reduce((sum, s) => sum + s.vestedShares, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faLock} className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Zablokowane akcje</p>
              <p className="text-2xl font-bold text-white">
                {schedules.reduce((sum, s) => sum + s.unvestedShares, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vesting Schedules */}
      {schedules.map((schedule) => (
        <div key={schedule.id} className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{schedule.shareholderName}</h3>
              <span className={`inline-block px-3 py-1 rounded text-sm font-medium mt-2 ${getStatusColor(schedule.status)}`}>
                {getStatusLabel(schedule.status)}
              </span>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Typ vesting</p>
              <p className="text-white font-medium capitalize">
                {schedule.type === 'time_based' ? 'Czasowy' : schedule.type === 'milestone_based' ? 'Kamieniowy' : 'Cliff'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Postęp odblokowywania</span>
              <span className="text-white font-semibold">
                {((schedule.vestedShares / schedule.totalShares) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${(schedule.vestedShares / schedule.totalShares) * 100}%` }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-slate-400 text-sm">Całkowita liczba akcji</p>
              <p className="text-white font-semibold">{schedule.totalShares.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Odblokowane</p>
              <p className="text-green-400 font-semibold">{schedule.vestedShares.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Zablokowane</p>
              <p className="text-red-400 font-semibold">{schedule.unvestedShares.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Okres (miesiące)</p>
              <p className="text-white font-semibold">{schedule.vestingPeriodMonths}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-slate-700 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Data rozpoczęcia</p>
                <p className="text-white">{new Date(schedule.startDate).toLocaleDateString('pl-PL')}</p>
              </div>
              {schedule.cliffDate && (
                <div>
                  <p className="text-slate-400">Data cliff</p>
                  <p className="text-white">{new Date(schedule.cliffDate).toLocaleDateString('pl-PL')}</p>
                </div>
              )}
              <div>
                <p className="text-slate-400">Data zakończenia</p>
                <p className="text-white">{new Date(schedule.endDate).toLocaleDateString('pl-PL')}</p>
              </div>
              {schedule.lockupEndDate && (
                <div>
                  <p className="text-slate-400">Koniec lock-up</p>
                  <p className="text-white">{new Date(schedule.lockupEndDate).toLocaleDateString('pl-PL')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Milestones */}
          {schedule.milestones && schedule.milestones.length > 0 && (
            <div className="border-t border-slate-700 pt-4 mt-4">
              <h4 className="text-white font-semibold mb-3">Kamienie milowe</h4>
              <div className="space-y-2">
                {schedule.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      milestone.achieved ? 'bg-green-900 bg-opacity-20' : 'bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon={milestone.achieved ? faCheckCircle : faLock}
                        className={milestone.achieved ? 'text-green-400' : 'text-slate-500'}
                      />
                      <div>
                        <p className="text-white font-medium">{milestone.description}</p>
                        {milestone.achievedDate && (
                          <p className="text-slate-400 text-sm">
                            Osiągnięto: {new Date(milestone.achievedDate).toLocaleDateString('pl-PL')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-semibold">
                        {milestone.sharesUnlocked.toLocaleString()} akcji
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Vesting;
