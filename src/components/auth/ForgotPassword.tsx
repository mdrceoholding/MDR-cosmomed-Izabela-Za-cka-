import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      addToast('error', 'Proszę podać adres email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast('error', 'Nieprawidłowy format email');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSent(true);
    addToast('success', 'Link do resetowania hasła został wysłany na email');
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center">
          <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-2xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Email wysłany!</h2>
          <p className="text-gray-300 mb-6">
            Link do resetowania hasła został wysłany na adres:
          </p>
          <p className="text-blue-400 font-medium mb-8">{email}</p>
          <p className="text-sm text-gray-400 mb-6">
            Sprawdź swoją skrzynkę odbiorczą i kliknij w link, aby zresetować hasło.
            Link będzie ważny przez 24 godziny.
          </p>
          <button
            onClick={onBackToLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4
                     rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <i className="fas fa-arrow-left"></i>
            Wróć do logowania
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
      <div className="text-center mb-8">
        <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-key text-2xl text-white"></i>
        </div>
        <h2 className="text-3xl font-bold text-white">Resetowanie hasła</h2>
        <p className="text-gray-400 mt-2">Podaj swój email, aby otrzymać link do resetowania hasła</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <i className="fas fa-envelope mr-2"></i>
            Adres email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white
                     focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="twoj@email.com"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4
                   rounded-lg transition-colors duration-200 flex items-center justify-center gap-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-paper-plane"></i>
          {loading ? 'Wysyłanie...' : 'Wyślij link resetujący'}
        </button>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full text-gray-400 hover:text-white transition-colors flex items-center
                   justify-center gap-2 py-2"
        >
          <i className="fas fa-arrow-left"></i>
          Wróć do logowania
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">
            <i className="fas fa-info-circle mr-1"></i>
            Wskazówka:
          </p>
          <p className="text-xs text-gray-300">
            Jeśli nie otrzymasz emaila w ciągu kilku minut, sprawdź folder SPAM lub skontaktuj się
            z administratorem systemu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
