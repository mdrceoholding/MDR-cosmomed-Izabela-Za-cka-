import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faCoins,
  faFileChartLine,
  faCalendar,
  faLockOpen,
  faChartLine,
  faFolderTree,
  faFileLines,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import { getUpcomingEvents } from '../data/mockData';

interface MenuItem {
  path: string;
  label: string;
  icon: any;
  badge?: number;
  roles?: string[];
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const upcomingEventsCount = getUpcomingEvents(7).length;

  const menuItems: MenuItem[] = [
    { path: '/', label: 'Dashboard', icon: faHome },
    { path: '/shareholders', label: 'Akcjonariusze', icon: faUsers },
    { path: '/dividends', label: 'Dywidendy', icon: faCoins },
    { path: '/reports', label: 'Raporty', icon: faFileChartLine },
    { path: '/calendar', label: 'Kalendarz', icon: faCalendar, badge: upcomingEventsCount },
    { path: '/vesting', label: 'Vesting', icon: faLockOpen },
    {
      path: '/analytics',
      label: 'Analityka',
      icon: faChartLine,
      roles: ['admin', 'manager']
    },
    {
      path: '/vdr',
      label: 'Sala Danych',
      icon: faFolderTree,
      roles: ['admin', 'manager', 'viewer']
    },
    { path: '/documents', label: 'Dokumenty', icon: faFileLines },
  ];

  const canAccessMenuItem = (item: MenuItem): boolean => {
    if (!item.roles || !user) return true;
    return item.roles.includes(user.role);
  };

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-blue-500">PSA</h1>
        <p className="text-sm text-slate-400">Rejestr Akcjonariuszy</p>
      </div>

      {/* User info */}
      {user && (
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.filter(canAccessMenuItem).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
          <span>Wyloguj</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
