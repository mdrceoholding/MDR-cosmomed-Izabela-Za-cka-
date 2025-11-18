import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuthStore } from '../services/store';
import { authAPI } from '../services/api';

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const { register: registerProfile, handleSubmit: handleProfileSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      language: user?.language,
    },
  });

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetPassword } = useForm();

  const onProfileSubmit = async (data: any) => {
    try {
      await authAPI.updateDetails(data);
      updateUser(data);
      toast.success('Profil zaktualizowany');
      setIsEditingProfile(false);
    } catch (error) {
      toast.error('Błąd podczas aktualizacji profilu');
    }
  };

  const onPasswordSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Hasła nie są identyczne');
      return;
    }

    try {
      await authAPI.updatePassword(data.currentPassword, data.newPassword);
      toast.success('Hasło zmienione pomyślnie');
      setIsChangingPassword(false);
      resetPassword();
    } catch (error) {
      toast.error('Błąd podczas zmiany hasła');
    }
  };

  return (
    <div className="section">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl font-bold text-dark-text mb-8">Profil użytkownika</h1>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated mb-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-dark-text">
                Informacje osobiste
              </h2>
              <p className="text-sm text-dark-text-secondary mt-1">
                Twoje dane osobowe i preferencje
              </p>
            </div>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="btn-outline"
            >
              {isEditingProfile ? 'Anuluj' : 'Edytuj'}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Imię
                  </label>
                  <input {...registerProfile('firstName')} className="input-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Nazwisko
                  </label>
                  <input {...registerProfile('lastName')} className="input-primary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Telefon
                </label>
                <input {...registerProfile('phone')} className="input-primary" />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Język
                </label>
                <select {...registerProfile('language')} className="input-primary">
                  <option value="pl">Polski</option>
                  <option value="en">English</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full">
                Zapisz zmiany
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-dark-elevated rounded-lg">
                <p className="text-sm text-dark-text-secondary">Imię i nazwisko</p>
                <p className="text-dark-text font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <div className="p-4 bg-dark-elevated rounded-lg">
                <p className="text-sm text-dark-text-secondary">Email</p>
                <p className="text-dark-text font-medium">{user?.email}</p>
              </div>
              {user?.phone && (
                <div className="p-4 bg-dark-elevated rounded-lg">
                  <p className="text-sm text-dark-text-secondary">Telefon</p>
                  <p className="text-dark-text font-medium">{user.phone}</p>
                </div>
              )}
              <div className="p-4 bg-dark-elevated rounded-lg">
                <p className="text-sm text-dark-text-secondary">Język</p>
                <p className="text-dark-text font-medium">
                  {user?.language === 'pl' ? 'Polski' : 'English'}
                </p>
              </div>
              <div className="p-4 bg-dark-elevated rounded-lg">
                <p className="text-sm text-dark-text-secondary">Rola</p>
                <p className="text-dark-text font-medium capitalize">{user?.role}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Password Change */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-elevated"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-dark-text">Zmiana hasła</h2>
              <p className="text-sm text-dark-text-secondary mt-1">
                Zaktualizuj swoje hasło
              </p>
            </div>
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="btn-outline"
            >
              {isChangingPassword ? 'Anuluj' : 'Zmień hasło'}
            </button>
          </div>

          {isChangingPassword && (
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Obecne hasło
                </label>
                <input
                  type="password"
                  {...registerPassword('currentPassword', { required: true })}
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Nowe hasło
                </label>
                <input
                  type="password"
                  {...registerPassword('newPassword', {
                    required: true,
                    minLength: 6,
                  })}
                  className="input-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Potwierdź nowe hasło
                </label>
                <input
                  type="password"
                  {...registerPassword('confirmPassword', { required: true })}
                  className="input-primary"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Zmień hasło
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
