import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserInitials } from '../../data/mockData';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return null;

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>

            {/* Logo - Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <i className="fas fa-building text-white text-sm"></i>
              </div>
              <span className="text-white font-bold text-sm">PSA</span>
            </div>

            {/* Global Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj dokumentów, użytkowników, akcjonariuszy..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                           placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Icon */}
            <button className="md:hidden text-gray-400 hover:text-white transition-colors">
              <i className="fas fa-search text-lg"></i>
            </button>

            {/* Notifications */}
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <i className="fas fa-bell text-lg"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5
                             flex items-center justify-center font-bold">3</span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:bg-gray-700 rounded-lg px-2 py-1 transition-colors"
              >
                <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center
                              text-white font-semibold text-sm">
                  {getUserInitials(user.firstName, user.lastName)}
                </div>
                <span className="hidden md:block text-white font-medium text-sm">
                  {user.firstName} {user.lastName}
                </span>
                <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-700">
                      <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                      <p className="text-xs text-blue-400 mt-1 capitalize">{user.role}</p>
                    </div>
                    <div className="py-2">
                      <a
                        href="#profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        <i className="fas fa-user w-5"></i>
                        <span>Mój profil</span>
                      </a>
                      <a
                        href="#settings"
                        className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        <i className="fas fa-cog w-5"></i>
                        <span>Ustawienia</span>
                      </a>
                      <a
                        href="#help"
                        className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        <i className="fas fa-question-circle w-5"></i>
                        <span>Pomoc</span>
                      </a>
                    </div>
                    <div className="border-t border-gray-700 py-2">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300
                                 transition-colors w-full"
                      >
                        <i className="fas fa-sign-out-alt w-5"></i>
                        <span>Wyloguj się</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
