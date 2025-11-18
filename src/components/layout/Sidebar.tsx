import React from 'react';
import { UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  roles?: UserRole[]; // If specified, only these roles can see the item
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, onClose }) => {
  const { user } = useAuth();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fa-chart-line'
    },
    {
      id: 'shareholders',
      label: 'Akcjonariusze',
      icon: 'fa-users'
    },
    {
      id: 'transactions',
      label: 'Transakcje',
      icon: 'fa-exchange-alt',
      badge: 2
    },
    {
      id: 'documents',
      label: 'Dokumenty',
      icon: 'fa-file-alt',
      badge: 3
    },
    {
      id: 'meetings',
      label: 'Zebrania (WZA)',
      icon: 'fa-calendar-alt'
    },
    {
      id: 'reports',
      label: 'Raporty',
      icon: 'fa-chart-bar'
    },
    {
      id: 'users',
      label: 'Użytkownicy',
      icon: 'fa-user-cog',
      roles: [UserRole.ADMIN] // Only admins can see this
    },
    {
      id: 'profile',
      label: 'Mój profil',
      icon: 'fa-user'
    },
    {
      id: 'settings',
      label: 'Ustawienia',
      icon: 'fa-cog'
    }
  ];

  const handleNavigate = (view: string) => {
    onNavigate(view);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gray-800 border-r border-gray-700 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
                <i className="fas fa-building text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Rejestr PSA</h1>
                <p className="text-xs text-gray-400">MDR PHILOSOPHY</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <div className="space-y-1">
              {filteredNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 group relative
                    ${currentView === item.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <i className={`fas ${item.icon} text-lg ${
                    currentView === item.id ? 'text-white' : 'text-gray-400 group-hover:text-blue-400'
                  }`}></i>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-bold
                      ${currentView === item.id
                        ? 'bg-white text-blue-600'
                        : 'bg-red-500 text-white'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                  {currentView === item.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r"></div>
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <i className="fas fa-crown text-yellow-300"></i>
                <span className="font-semibold text-sm">Wersja PRO</span>
              </div>
              <p className="text-xs text-blue-100 mb-3">
                Uzyskaj dostęp do wszystkich funkcji premium
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-2 px-3 rounded
                               text-sm hover:bg-blue-50 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
