import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../services/store';
import {
  HomeIcon,
  UserCircleIcon,
  BookOpenIcon,
  HeartIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

export default function Layout() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Sesja', href: '/session', icon: HeartIcon },
    { name: 'Dziennik', href: '/journal', icon: BookOpenIcon },
    { name: 'Zgoda medyczna', href: '/medical-consent', icon: DocumentTextIcon },
    { name: 'Profil', href: '/profile', icon: UserCircleIcon },
  ];

  if (user?.role === 'facilitator' || user?.role === 'admin') {
    navigation.push({
      name: 'Panel facilitatora',
      href: '/facilitator',
      icon: Bars3Icon,
    });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-dark-surface border-r border-dark-border hidden md:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-dark-border">
            <h1 className="text-2xl font-bold text-gradient">
              Breathwork
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all
                    ${
                      isActive(item.href)
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-dark-text-secondary hover:bg-dark-elevated hover:text-dark-text'
                    }
                  `}
                >
                  <Icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-dark-border p-4">
            <div className="mb-3">
              <p className="text-sm font-medium text-dark-text">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-dark-text-secondary">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-400 hover:bg-dark-elevated rounded-lg transition-all"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
              Wyloguj się
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
