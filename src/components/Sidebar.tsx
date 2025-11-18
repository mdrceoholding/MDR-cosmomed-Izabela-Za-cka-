import { NavItem } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: 'fa-home', path: '/' },
  { id: 'shareholders', name: 'Akcjonariusze', icon: 'fa-users', path: '/shareholders' },
  { id: 'cap-table', name: 'Cap Table', icon: 'fa-chart-pie', path: '/cap-table' },
  { id: 'documents', name: 'Wzory dokumentów', icon: 'fa-file-invoice', path: '/documents' },
  { id: 'reports', name: 'Raporty', icon: 'fa-file-chart-line', path: '/reports' },
  { id: 'settings', name: 'Ustawienia', icon: 'fa-cog', path: '/settings' }
];

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Rejestr Akcjonariuszy</h1>
        <p className="text-sm text-gray-400 mt-1">PSA Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400">TechStart PSA</p>
          <p className="text-xs text-gray-500 mt-1">KRS: 0000123456</p>
        </div>
      </div>
    </aside>
  );
}
