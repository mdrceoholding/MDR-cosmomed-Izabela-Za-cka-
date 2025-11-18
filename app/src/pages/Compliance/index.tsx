import React, { useState } from 'react';
import { ComplianceDashboard } from './ComplianceDashboard';
import { ChecklistEditor } from './ChecklistEditor';
import { ReportGenerator } from './ReportGenerator';
import { AuditHistory } from './AuditHistory';
import { CAPAManager } from './CAPAManager';
import {
  LayoutDashboard,
  FileEdit,
  FileText,
  History,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

type ComplianceTab = 'dashboard' | 'checklist' | 'reports' | 'audits' | 'capa';

export const Compliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ComplianceTab>('dashboard');

  const tabs = [
    {
      key: 'dashboard' as const,
      label: 'Dashboard',
      icon: LayoutDashboard,
      component: ComplianceDashboard,
    },
    {
      key: 'checklist' as const,
      label: 'Checklista',
      icon: FileEdit,
      component: ChecklistEditor,
    },
    {
      key: 'reports' as const,
      label: 'Raporty',
      icon: FileText,
      component: ReportGenerator,
    },
    {
      key: 'audits' as const,
      label: 'Historia Audytów',
      icon: History,
      component: AuditHistory,
    },
    {
      key: 'capa' as const,
      label: 'CAPA',
      icon: AlertTriangle,
      component: CAPAManager,
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.key === activeTab)?.component || ComplianceDashboard;

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
        <nav className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap',
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                )}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};
