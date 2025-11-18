import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GrantsHub from './pages/GrantsHub';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/grants-hub" replace />} />
        <Route path="/grants-hub/*" element={<GrantsHub />} />
      </Routes>
    </Router>
  );
};

export default App;
