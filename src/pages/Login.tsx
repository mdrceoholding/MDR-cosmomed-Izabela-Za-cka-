import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(email, password);
    if (success) {
      toast.success('Zalogowano pomyślnie');
      navigate('/');
    } else {
      toast.error('Nieprawidłowy email lub hasło');
    }
  };

  const demoUsers = [
    { email: 'admin@psa.pl', role: 'Admin', password: 'admin' },
    { email: 'manager@psa.pl', role: 'Manager', password: 'manager' },
    { email: 'viewer@psa.pl', role: 'Viewer', password: 'viewer' },
    { email: 'guest@psa.pl', role: 'Guest', password: 'guest' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faBuilding} className="text-white text-3xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">PSA</h1>
                <p className="text-slate-400">Rejestr Akcjonariuszy</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              System zarządzania akcjonariuszami
            </h2>
            <p className="text-slate-400 text-lg">
              Kompleksowe rozwiązanie do zarządzania strukturą kapitałową, dywidendami,
              raportami i dokumentami dla Twojej spółki.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Funkcje systemu:</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Zarządzanie dywidendami z automatyczną kalkulacją</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Generator raportów (PDF, Excel, CSV)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Kalendarz wydarzeń z przypomnieniami</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Vesting i lock-up periods</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Zaawansowana analityka z wykresami</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Wirtualna sala danych (VDR) z kontrolą dostępu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center">
          <div className="card">
            <h3 className="text-2xl font-bold text-white mb-6">Logowanie</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">Email</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full pl-12"
                    placeholder="twoj@email.pl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Hasło</label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full pl-12"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Zaloguj się
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-slate-400 text-sm mb-3">Konta demonstracyjne:</p>
              <div className="grid grid-cols-2 gap-2">
                {demoUsers.map((user) => (
                  <button
                    key={user.email}
                    onClick={() => {
                      setEmail(user.email);
                      setPassword(user.password);
                    }}
                    className="text-left p-2 rounded bg-slate-700 hover:bg-slate-600 transition-colors"
                  >
                    <p className="text-white text-sm font-medium">{user.role}</p>
                    <p className="text-slate-400 text-xs">{user.email}</p>
                  </button>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-3">
                Kliknij aby wypełnić formularz
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
