import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminDashboard } from './AdminDashboard';
import { ApplicationManagementTable } from './ApplicationManagementTable';
import { ApplicationReviewWorkspace } from './ApplicationReviewWorkspace';
import { DeficiencyQueue } from './DeficiencyQueue';
import { SelectionScrutinyWorkspace } from './SelectionScrutinyWorkspace';
import { SchemeRulesConfigurator } from './SchemeRulesConfigurator';
import { ReportsAnalytics } from './ReportsAnalytics';
import { AuditTrail } from './AuditTrail';
import { 
  LayoutDashboard, 
  Table, 
  FileCheck2, 
  AlertTriangle, 
  Award, 
  Settings, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';

export const AdminPortal = ({ initialTab = 'dashboard' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { applications, setSelectedAppId } = useApp();

  const deficiencyCount = applications.filter(a => a.verificationStatus === 'DEFICIENCY_RAISED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Admin Module Navigation Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 p-1.5 shadow-sm flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'dashboard'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'applications'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Applications Ledger</span>
        </button>

        <button
          onClick={() => setActiveTab('workspace')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'workspace'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>Review Workspace</span>
        </button>

        <button
          onClick={() => setActiveTab('deficiencies')}
          className={`relative flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'deficiencies'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Deficiency Queue</span>
          {deficiencyCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-mono text-[10px]">
              {deficiencyCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('scrutiny')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'scrutiny'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Selection & Scrutiny</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'rules'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Scheme Rules Config</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'analytics'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Reports & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'audit'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Trail</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === 'dashboard' && (
          <AdminDashboard 
            onNavigate={(tab) => setActiveTab(tab)} 
            onSelectApp={(id) => setSelectedAppId(id)}
          />
        )}
        {activeTab === 'applications' && (
          <ApplicationManagementTable onOpenWorkspace={() => setActiveTab('workspace')} />
        )}
        {activeTab === 'workspace' && (
          <ApplicationReviewWorkspace onNavigateToQueue={() => setActiveTab('deficiencies')} />
        )}
        {activeTab === 'deficiencies' && (
          <DeficiencyQueue onOpenWorkspace={() => setActiveTab('workspace')} />
        )}
        {activeTab === 'scrutiny' && (
          <SelectionScrutinyWorkspace />
        )}
        {activeTab === 'rules' && (
          <SchemeRulesConfigurator />
        )}
        {activeTab === 'analytics' && (
          <ReportsAnalytics />
        )}
        {activeTab === 'audit' && (
          <AuditTrail />
        )}
      </div>
    </div>
  );
};
