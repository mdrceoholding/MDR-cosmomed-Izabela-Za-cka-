import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ResolutionsPage from './pages/ResolutionsPage'
import ResolutionDetail from './pages/ResolutionDetail'
import NewResolution from './pages/NewResolution'
import TemplatesPage from './pages/TemplatesPage'
import ArchivePage from './pages/ArchivePage'
import NotificationsPage from './pages/NotificationsPage'
import { useNotificationChecker } from './hooks/useNotificationChecker'

function App() {
  // Automatyczne sprawdzanie i generowanie powiadomień
  useNotificationChecker()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="resolutions" element={<ResolutionsPage />} />
        <Route path="resolutions/new" element={<NewResolution />} />
        <Route path="resolutions/:id" element={<ResolutionDetail />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  )
}

export default App
