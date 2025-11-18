import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Shareholders from './components/Shareholders';
import DocumentTemplates from './components/DocumentTemplates';
import PlaceholderView from './components/PlaceholderView';

const sidebarItems = [
  { name: "Dashboard", icon: "fa-gauge" },
  { name: "Cap Table", icon: "fa-layer-group" },
  { name: "Emisje", icon: "fa-coins" },
  { name: "Transakcje", icon: "fa-arrow-right-arrow-left" },
  { name: "WZA/Głosowania", icon: "fa-users-between-lines" },
  { name: "Dokumenty", icon: "fa-folder-open" },
  { name: "Wzory dokumentów", icon: "fa-file-invoice" },
  { name: "Akcjonariusze", icon: "fa-users" },
  { name: "KYC/AML", icon: "fa-shield" },
  { name: "Audyt", icon: "fa-magnifying-glass" },
  { name: "Ustawienia", icon: "fa-gear" }
];

function App() {
  const [active, setActive] = useState("Dashboard");

  const MainContent = () => {
    switch (active) {
      case "Dashboard":
        return <Dashboard />;
      case "Akcjonariusze":
        return <Shareholders />;
      case "Wzory dokumentów":
        return <DocumentTemplates />;
      default:
        const mod = sidebarItems.find((x) => x.name === active);
        return <PlaceholderView icon={mod?.icon || "fa-circle"} name={mod?.name || active} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <Sidebar current={active} setCurrent={setActive} />
      <main className="flex-1 ml-64 px-6 py-12 transition">
        <MainContent />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155'
          },
          success: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#f1f5f9'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f1f5f9'
            }
          }
        }}
      />
    </div>
  );
}

export default App;
