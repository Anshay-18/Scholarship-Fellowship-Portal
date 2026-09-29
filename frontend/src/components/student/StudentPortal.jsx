import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicantDashboard } from './ApplicantDashboard';
import { SchemeDiscovery } from './SchemeDiscovery';
import { ApplicationWizard } from './ApplicationWizard';
import { ApplicationTracker } from './ApplicationTracker';
import { FellowshipManagement } from './FellowshipManagement';
import { 
  LayoutDashboard, 
  BookOpen, 
  FilePlus, 
  FileText, 
  Award,
  AlertCircle
} from 'lucide-react';

export const StudentPortal = ({ initialTab = 'dashboard' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [preselectedSchemeId, setPreselectedSchemeId] = useState('NFST');
  const { applications } = useApp();

  // Check if primary demo applicant has active deficiency
  const myApp = applications.find(a => a.id === 'MOTA-2026-NFST-0101') || applications[0];
  const hasDeficiency = myApp.deficiency && myApp.deficiency.hasDeficiency && !myApp.deficiency.resolved;

  const handleApplyScheme = (schemeId) => {
    setPreselectedSchemeId(schemeId);
    setActiveTab('apply');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Portal Navigation Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 p-1.5 shadow-sm flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'dashboard'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Applicant Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'schemes'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Scholarship Schemes</span>
        </button>

        <button
          onClick={() => setActiveTab('apply')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'apply'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FilePlus className="w-4 h-4" />
          <span>New Application (Wizard)</span>
        </button>

        <button
          onClick={() => setActiveTab('track')}
          className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'track'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Track Application & Deficiencies</span>
          {hasDeficiency && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('fellowship')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-md text-xs font-semibold transition ${
            activeTab === 'fellowship'
              ? 'bg-[#1b365d] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Fellowship Grant & DBT</span>
        </button>
      </div>

      {/* Tab views */}
      <div>
        {activeTab === 'dashboard' && <ApplicantDashboard onNavigate={(tab) => setActiveTab(tab)} />}
        {activeTab === 'schemes' && <SchemeDiscovery onSelectSchemeToApply={handleApplyScheme} />}
        {activeTab === 'apply' && <ApplicationWizard preselectedSchemeId={preselectedSchemeId} onNavigate={(tab) => setActiveTab(tab)} />}
        {activeTab === 'track' && <ApplicationTracker onNavigateToFellowship={() => setActiveTab('fellowship')} />}
        {activeTab === 'fellowship' && <FellowshipManagement />}
      </div>
    </div>
  );
};
