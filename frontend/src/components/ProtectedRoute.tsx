import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../services/store';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
