import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronRight, 
  SlidersHorizontal, 
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const ApplicationManagementTable = ({ onOpenWorkspace }) => {
  const { applications, setSelectedAppId } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedStage, setSelectedStage] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');

  // Filter logic
  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = 
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tribe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.institution.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesScheme = selectedScheme === 'ALL' || app.schemeId === selectedScheme;
      const matchesStatus = selectedStatus === 'ALL' || app.verificationStatus === selectedStatus;
      const matchesStage = selectedStage === 'ALL' || app.stage === selectedStage;
      const matchesState = selectedState === 'ALL' || app.state === selectedState;

      return matchesSearch && matchesScheme && matchesStatus && matchesStage && matchesState;
    });
  }, [applications, searchQuery, selectedScheme, selectedStatus, selectedStage, selectedState]);

  // Unique states for filter dropdown
  const uniqueStates = useMemo(() => {
    return Array.from(new Set(applications.map(a => a.state))).sort();
  }, [applications]);

  // CSV Export Functionality
  const handleExportCSV = () => {
    const headers = ['Application ID', 'Applicant Name', 'Scheme', 'Tribe', 'State', 'Institution', 'Submission Date', 'Stage', 'Verification Status', 'Eligibility', 'Assigned Officer'];
    const rows = filteredApps.map(app => [
      `"${app.id}"`,
      `"${app.applicantName}"`,
      `"${app.schemeId}"`,
      `"${app.tribe}"`,
      `"${app.state}"`,
      `"${app.institution.replace(/"/g, '""')}"`,
      `"${app.submissionDate}"`,
      `"${app.stage}"`,
      `"${app.verificationStatus}"`,
      `"${app.eligibilityStatus}"`,
      `"${app.assignedOfficer}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MoTA_Applications_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenApp = (id) => {
    setSelectedAppId(id);
    onOpenWorkspace();
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedScheme('ALL');
    setSelectedStatus('ALL');
    setSelectedStage('ALL');
    setSelectedState('ALL');
  };

  return (
    <div className="space-y-5">
      {/* Header & Controls */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Applications Master Ledger & Scrutiny Register
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive registry of Scheduled Tribe applicants for NFST and NOS Schemes (Session 2026–27)
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition self-start md:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Filtered Cohort (CSV)</span>
          </button>
        </div>

        {/* Search Bar & Multi-Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs pt-1">
          {/* Search Input (2 cols) */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by App ID, Name, Tribe, or University..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-slate-900 focus:outline-none focus:border-indigo-600"
            />
          </div>

          {/* Scheme Filter */}
          <div>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full py-2 px-2.5 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-indigo-600 bg-white"
            >
              <option value="ALL">All Schemes</option>
              <option value="NFST">NFST (National Fellowship)</option>
              <option value="NOS">NOS (National Overseas)</option>
            </select>
          </div>

          {/* Verification Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-2.5 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-indigo-600 bg-white"
            >
              <option value="ALL">All Verification Statuses</option>
              <option value="PENDING">Pending Verification</option>
              <option value="AI_FLAGGED">AI Advisory Flag</option>
              <option value="DEFICIENCY_RAISED">Deficiency Raised</option>
              <option value="DEFICIENCY_RESOLVED">Clarification Submitted</option>
              <option value="VERIFIED">Document Verified</option>
            </select>
          </div>

          {/* Stage Filter */}
          <div>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full py-2 px-2.5 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-indigo-600 bg-white"
            >
              <option value="ALL">All Stages</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="DOCUMENT_VERIFICATION">Document Verification</option>
              <option value="ELIGIBILITY_REVIEW">Eligibility Review</option>
              <option value="SCRUTINY">Under Scrutiny</option>
              <option value="SELECTION">Selection Recommended</option>
              <option value="AWARDED">Awarded / Sanctioned</option>
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full py-2 px-2.5 border border-slate-300 rounded text-slate-800 focus:outline-none focus:border-indigo-600 bg-white"
            >
              <option value="ALL">All States</option>
              {uniqueStates.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-900">{filteredApps.length}</strong> of <strong className="text-slate-900">{applications.length}</strong> seeded records
          </span>
          {(searchQuery || selectedScheme !== 'ALL' || selectedStatus !== 'ALL' || selectedStage !== 'ALL' || selectedState !== 'ALL') && (
            <button
              onClick={handleResetFilters}
              className="text-indigo-700 hover:text-indigo-900 font-medium flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0f2537] text-white uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Application ID</th>
                <th className="px-4 py-3.5">Applicant & Tribe</th>
                <th className="px-4 py-3.5">Scheme & Level</th>
                <th className="px-4 py-3.5">State</th>
                <th className="px-4 py-3.5">Submitted</th>
                <th className="px-4 py-3.5">Verification</th>
                <th className="px-4 py-3.5">Stage</th>
                <th className="px-4 py-3.5">Officer</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-400">
                    No applications match the current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-mono font-bold text-indigo-950">
                      {app.id}
                      {app.urgentAttention && (
                        <span className="block text-[10px] text-rose-600 font-semibold mt-0.5">
                          ● Urgent Scrutiny
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{app.applicantName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">Tribe: {app.tribe}</div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-800">{app.schemeId}</span>
                      <div className="text-[11px] text-slate-500">{app.studyLevel}</div>
                    </td>

                    <td className="px-4 py-3 text-slate-700">{app.state}</td>

                    <td className="px-4 py-3 font-mono text-slate-600">{app.submissionDate}</td>

                    <td className="px-4 py-3">
                      <StatusBadge status={app.verificationStatus} type="status" size="small" />
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={app.stage} type="stage" size="small" />
                    </td>

                    <td className="px-4 py-3 text-slate-600 text-[11px]">
                      {app.assignedOfficer}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleOpenApp(app.id)}
                        className="px-3 py-1.5 rounded bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-semibold transition shadow-sm inline-flex items-center space-x-1"
                      >
                        <span>Review</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
