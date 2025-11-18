import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GrantsHub from './pages/GrantsHub';
import MDREducationPage from './pages/MDREducation/MDREducationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/mdr-education" replace />} />
        <Route path="/grants-hub/*" element={<GrantsHub />} />
        <Route path="/mdr-education" element={<MDREducationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
