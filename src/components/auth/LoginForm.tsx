import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import LoadingSkeleton from '../LoadingSkeleton';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSwitchToForgot: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onSwitchToForgot }) => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      addToast('error', 'Proszę wypełnić wszystkie pola');
      setLoading(false);
      return;
    }

    const success = await login(email, password);

    if (success) {
      addToast('success', 'Zalogowano pomyślnie!');
    } else {
      addToast('error', 'Nieprawidłowy email lub hasło');
    }

    setLoading(false);
  };

  const quickLogin = (userEmail: string, userPassword: string = 'demo1234') => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  if (loading) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <LoadingSkeleton variant="text" height="40px" className="mb-4" />
        <LoadingSkeleton variant="card" height="200px" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
      <div className="text-center mb-8">
        <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-building text-2xl text-white"></i>
        </div>
        <h2 className="text-3xl font-bold text-white">Rejestr Akcjonariuszy PSA</h2>
        <p className="text-gray-400 mt-2">Zaloguj się do systemu</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <i className="fas fa-envelope mr-2"></i>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white
                     focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="twoj@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <i className="fas fa-lock mr-2"></i>
            Hasło
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors pr-12"
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
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-300">
            <input type="checkbox" className="mr-2 rounded" />
            Zapamiętaj mnie
          </label>
          <button
            type="button"
            onClick={onSwitchToForgot}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Zapomniałem hasła
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4
                   rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <i className="fas fa-sign-in-alt"></i>
          Zaloguj się
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-center text-gray-400 text-sm mb-4">
          Nie masz konta?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Zarejestruj się
          </button>
        </p>

        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-xs text-gray-400 mb-2 text-center">Szybkie logowanie (demo):</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={() => quickLogin('dorota.ploskon@mdrphilosophy.pl')}
              className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => quickLogin('jan.kowalski@mdrphilosophy.pl')}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
            >
              Manager
            </button>
            <button
              type="button"
              onClick={() => quickLogin('anna.nowak@mdrphilosophy.pl')}
              className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded transition-colors"
            >
              Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
