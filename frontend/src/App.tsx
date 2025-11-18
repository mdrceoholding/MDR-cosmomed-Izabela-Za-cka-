import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore, useUIStore } from './services/store';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SessionPage from './pages/SessionPage';
import JournalPage from './pages/JournalPage';
import MedicalConsentPage from './pages/MedicalConsentPage';
import FacilitatorDashboard from './pages/FacilitatorDashboard';
import ProfilePage from './pages/ProfilePage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { isDarkMode } = useUIStore();

  useEffect(() => {
    // Set dark mode class on html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? '#1a1825' : '#ffffff',
            color: isDarkMode ? '#e4e2ec' : '#000000',
            border: isDarkMode ? '1px solid #2d2a3d' : '1px solid #e5e7eb',
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/session" element={<SessionPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/medical-consent" element={<MedicalConsentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/facilitator" element={<FacilitatorDashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />} />
      </Routes>
    </>
  );
}

export default App;
