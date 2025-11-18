import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GrantsDashboard from './GrantsDashboard';
import GrantsTablePage from './GrantsTablePage';
import PartnersSearch from './PartnersSearch';

const GrantsHub: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GrantsDashboard />} />
      <Route path="/grants" element={<GrantsTablePage />} />
      <Route path="/partners" element={<PartnersSearch />} />
    </Routes>
  );
};

export default GrantsHub;
