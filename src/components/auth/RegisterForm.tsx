import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    position: '',
    phone: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Imię jest wymagane';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nazwisko jest wymagane';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Hasło musi mieć minimum 8 znaków';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Hasło musi zawierać: małą literę, wielką literę i cyfrę';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są identyczne';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Musisz zaakceptować regulamin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast('error', 'Proszę poprawić błędy w formularzu');
      return;
    }

    setLoading(true);

    const success = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      company: formData.company || undefined,
      position: formData.position || undefined,
      phone: formData.phone || undefined
    });

    if (success) {
      addToast('success', 'Konto utworzone pomyślnie!');
    } else {
      addToast('error', 'Email jest już zarejestrowany');
    }

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full">
      <div className="text-center mb-8">
        <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-user-plus text-2xl text-white"></i>
        </div>
        <h2 className="text-3xl font-bold text-white">Rejestracja</h2>
        <p className="text-gray-400 mt-2">Utwórz nowe konto w systemie</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Imię <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white
                       focus:outline-none transition-colors
                       ${errors.firstName ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'}`}
              placeholder="Jan"
            />
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nazwisko <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white
                       focus:outline-none transition-colors
                       ${errors.lastName ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'}`}
              placeholder="Kowalski"
            />
            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white
                     focus:outline-none transition-colors
                     ${errors.email ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'}`}
            placeholder="jan.kowalski@firma.pl"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hasło <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white
                         focus:outline-none transition-colors pr-12
                         ${errors.password ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Potwierdź hasło <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white
                       focus:outline-none transition-colors
                       ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'}`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Firma/Spółka
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="MDR PHILOSOPHY PSA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Stanowisko
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Dyrektor"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                     focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="+48 600 123 456"
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className={`mt-1 ${errors.acceptTerms ? 'border-red-500' : ''}`}
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-300">
            Akceptuję regulamin i politykę prywatności{' '}
            <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.acceptTerms && <p className="text-red-400 text-xs">{errors.acceptTerms}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4
                   rounded-lg transition-colors duration-200 flex items-center justify-center gap-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-user-plus"></i>
          {loading ? 'Rejestracja...' : 'Zarejestruj się'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 text-sm">
          Masz już konto?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Zaloguj się
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
