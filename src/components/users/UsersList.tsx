import React, { useState } from 'react';
import { mockUsers, getUserInitials, formatShortDate } from '../../data/mockData';
import { User, UserRole, UserStatus } from '../../types';
import { useToast } from '../../context/ToastContext';
import { TableSkeleton } from '../LoadingSkeleton';

const UsersList: React.FC = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState<keyof User>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sort handler
  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      const matchesSearch = searchTerm === '' ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesRole && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-600';
      case UserRole.MANAGER:
        return 'bg-blue-600';
      case UserRole.VIEWER:
        return 'bg-green-600';
      case UserRole.GUEST:
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusBadgeColor = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'bg-green-600';
      case UserStatus.INACTIVE:
        return 'bg-gray-600';
      case UserStatus.PENDING:
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Administrator';
      case UserRole.MANAGER:
        return 'Menedżer';
      case UserRole.VIEWER:
        return 'Przeglądający';
      case UserRole.GUEST:
        return 'Gość';
      default:
        return role;
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'Aktywny';
      case UserStatus.INACTIVE:
        return 'Nieaktywny';
      case UserStatus.PENDING:
        return 'Oczekujący';
      default:
        return status;
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      setUsers(users.filter(u => u.id !== userId));
      addToast('success', 'Użytkownik został usunięty');
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;
        addToast('success', `Użytkownik ${newStatus === UserStatus.ACTIVE ? 'aktywowany' : 'dezaktywowany'}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  if (loading) {
    return <TableSkeleton rows={10} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Zarządzanie użytkownikami</h2>
          <p className="text-gray-400 mt-1">Zarządzaj kontami użytkowników systemu</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg
                         flex items-center gap-2 transition-colors">
          <i className="fas fa-user-plus"></i>
          Dodaj użytkownika
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-search mr-2"></i>
              Szukaj
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Imię, nazwisko, email..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-user-tag mr-2"></i>
              Rola
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">Wszystkie</option>
              <option value={UserRole.ADMIN}>Administrator</option>
              <option value={UserRole.MANAGER}>Menedżer</option>
              <option value={UserRole.VIEWER}>Przeglądający</option>
              <option value={UserRole.GUEST}>Gość</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="fas fa-toggle-on mr-2"></i>
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as UserStatus | 'all')}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white
                       focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">Wszystkie</option>
              <option value={UserStatus.ACTIVE}>Aktywny</option>
              <option value={UserStatus.INACTIVE}>Nieaktywny</option>
              <option value={UserStatus.PENDING}>Oczekujący</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('firstName')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Użytkownik
                    {sortField === 'firstName' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Email
                    {sortField === 'email' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('role')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Rola
                    {sortField === 'role' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Status
                    {sortField === 'status' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('createdAt')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    Data rejestracji
                    {sortField === 'createdAt' && (
                      <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} text-blue-400`}></i>
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    <i className="fas fa-users text-4xl mb-2"></i>
                    <p>Nie znaleziono użytkowników</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center
                                      text-white font-semibold">
                          {getUserInitials(user.firstName, user.lastName)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-400">{user.position || 'Brak stanowiska'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`${getRoleBadgeColor(user.role)} px-3 py-1 rounded-full text-xs font-medium text-white`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`${getStatusBadgeColor(user.status)} px-3 py-1 rounded-full text-xs font-medium text-white`}>
                        {getStatusLabel(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{formatShortDate(user.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title={user.status === UserStatus.ACTIVE ? 'Dezaktywuj' : 'Aktywuj'}
                        >
                          <i className={`fas fa-${user.status === UserStatus.ACTIVE ? 'ban' : 'check'}`}></i>
                        </button>
                        <button
                          className="text-green-400 hover:text-green-300 transition-colors"
                          title="Edytuj"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Usuń"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="bg-gray-700 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Pokazano <span className="font-medium text-white">{filteredUsers.length}</span> z{' '}
              <span className="font-medium text-white">{users.length}</span> użytkowników
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors">
                Poprzednia
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors">
                Następna
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
