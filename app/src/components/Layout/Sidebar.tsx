import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Home, Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isDark, toggleTheme }) => {
  const menuItems = [
    { path: '/', label: 'Strona główna', icon: Home },
    { path: '/compliance', label: 'Compliance', icon: ShieldCheck },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo / Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          COSMOMED
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          MDR Compliance System
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )
              }
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer with theme toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
          {isDark ? 'Tryb jasny' : 'Tryb ciemny'}
        </button>
        <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-500">
          <p>Know-how Artura Fijołka</p>
          <p className="font-semibold">13.999.000 PLN</p>
        </div>
      </div>
    </div>
  );
};
