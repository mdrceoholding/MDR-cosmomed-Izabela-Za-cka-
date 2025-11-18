import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { useAuthStore } from '../services/store';

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  language: 'pl' | 'en';
  acceptTerms: boolean;
}

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    if (!data.acceptTerms) {
      toast.error('Musisz zaakceptować regulamin');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        language: data.language,
      });

      const { token, user } = response.data;
      login(token, user);
      toast.success('Konto utworzone pomyślnie!');
      navigate('/medical-consent');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Błąd rejestracji');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Rejestracja
          </h1>
          <p className="text-dark-text-secondary">
            Stwórz konto i rozpocznij swoją praktykę
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Imię
              </label>
              <input
                {...register('firstName', { required: 'Imię jest wymagane' })}
                className="input-primary"
                placeholder="Jan"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Nazwisko
              </label>
              <input
                {...register('lastName', { required: 'Nazwisko jest wymagane' })}
                className="input-primary"
                placeholder="Kowalski"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email jest wymagany',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Nieprawidłowy adres email',
                },
              })}
              className="input-primary"
              placeholder="jan@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Telefon
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="input-primary"
              placeholder="+48 123 456 789"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Hasło
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Hasło jest wymagane',
                  minLength: {
                    value: 6,
                    message: 'Hasło musi mieć min. 6 znaków',
                  },
                })}
                className="input-primary"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Potwierdź hasło
              </label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Potwierdź hasło',
                  validate: (value) =>
                    value === password || 'Hasła nie są identyczne',
                })}
                className="input-primary"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              Język
            </label>
            <select {...register('language')} className="input-primary">
              <option value="pl">Polski</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              {...register('acceptTerms', {
                required: 'Musisz zaakceptować regulamin',
              })}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-border rounded"
            />
            <label className="ml-2 text-sm text-dark-text-secondary">
              Akceptuję regulamin i potwierdzam, że zapoznałem się z
              przeciwwskazaniami do praktyki holotropowego oddechu
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-400">{errors.acceptTerms.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? 'Tworzenie konta...' : 'Utwórz konto'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-dark-text-secondary">
            Masz już konto?{' '}
            <Link
              to="/login"
              className="text-primary-400 hover:text-primary-300 font-medium"
            >
              Zaloguj się
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
