import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getUserInitials, formatShortDate } from '../../data/mockData';
import { CardSkeleton } from '../LoadingSkeleton';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    position: user?.position || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!user) {
    return (
      <div className="space-y-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    addToast('success', 'Profil został zaktualizowany');
    setEditMode(false);
    setLoading(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword.length < 8) {
      addToast('error', 'Hasło musi mieć minimum 8 znaków');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast('error', 'Hasła nie są identyczne');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    addToast('success', 'Hasło zostało zmienione');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setLoading(false);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'manager':
        return 'Menedżer';
      case 'viewer':
        return 'Przeglądający';
      case 'guest':
        return 'Gość';
      default:
        return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-600';
      case 'manager':
        return 'bg-blue-600';
      case 'viewer':
        return 'bg-green-600';
      case 'guest':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Mój profil</h2>
        <p className="text-gray-400 mt-1">Zarządzaj swoimi danymi i ustawieniami konta</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 mb-6">
            <div className="bg-blue-600 w-32 h-32 rounded-full flex items-center justify-center
                          text-white text-4xl font-bold border-4 border-gray-800 shadow-xl">
              {getUserInitials(user.firstName, user.lastName)}
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</h3>
              <p className="text-gray-400">{user.position || 'Brak stanowiska'}</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                <span className={`${getRoleBadgeColor(user.role)} px-3 py-1 rounded-full text-xs font-medium text-white`}>
                  {getRoleLabel(user.role)}
                </span>
                <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-medium text-white">
                  Aktywny
                </span>
              </div>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg
                       flex items-center gap-2 transition-colors"
            >
              <i className={`fas fa-${editMode ? 'times' : 'edit'}`}></i>
              {editMode ? 'Anuluj' : 'Edytuj profil'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <p className="text-white font-medium flex items-center gap-2">
                  <i className="fas fa-envelope text-blue-400"></i>
                  {user.email}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Telefon</label>
                <p className="text-white font-medium flex items-center gap-2">
                  <i className="fas fa-phone text-green-400"></i>
                  {user.phone || 'Nie podano'}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Firma</label>
                <p className="text-white font-medium flex items-center gap-2">
                  <i className="fas fa-building text-purple-400"></i>
                  {user.company || 'Nie podano'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Data rejestracji</label>
                <p className="text-white font-medium flex items-center gap-2">
                  <i className="fas fa-calendar text-yellow-400"></i>
                  {formatShortDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      {editMode && (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <i className="fas fa-user-edit text-blue-400"></i>
            Edytuj dane osobowe
          </h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Imię</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                           focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nazwisko</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                           focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                         focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                           focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Stanowisko</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                           focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Firma</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                         focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg
                       flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-save"></i>
              {loading ? 'Zapisywanie...' : 'Zapisz zmiany'}
            </button>
          </form>
        </div>
      )}

      {/* Change Password */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <i className="fas fa-lock text-yellow-400"></i>
          Zmiana hasła
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Obecne hasło</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nowe hasło</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                         focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Potwierdź nowe hasło</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                         focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg
                     flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <i className="fas fa-key"></i>
            {loading ? 'Zmienianie...' : 'Zmień hasło'}
          </button>
        </form>
      </div>

      {/* Activity Log */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <i className="fas fa-history text-purple-400"></i>
          Historia aktywności
        </h3>
        <div className="space-y-3">
          {[
            { action: 'Zalogowano do systemu', time: '2 godziny temu', icon: 'fa-sign-in-alt', color: 'text-green-400' },
            { action: 'Zaktualizowano profil', time: 'Wczoraj o 14:30', icon: 'fa-user-edit', color: 'text-blue-400' },
            { action: 'Zmieniono hasło', time: '3 dni temu', icon: 'fa-key', color: 'text-yellow-400' },
            { action: 'Utworzono dokument', time: '5 dni temu', icon: 'fa-file-alt', color: 'text-purple-400' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors">
              <div className={`w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center ${activity.color}`}>
                <i className={`fas ${activity.icon}`}></i>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
