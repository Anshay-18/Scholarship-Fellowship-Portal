import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  Send, 
  User, 
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';

export const DeficiencyQueue = ({ onOpenWorkspace }) => {
  const { applications, setSelectedAppId, verifyDocument } = useApp();

  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'AWAITING_STUDENT' | 'SUBMITTED_CLARIFICATION'

  // Applications with active or recently resolved deficiencies
  const deficiencyApps = applications.filter(a => 
    a.verificationStatus === 'DEFICIENCY_RAISED' || 
    a.verificationStatus === 'DEFICIENCY_RESOLVED' || 
    (a.deficiency && a.deficiency.hasDeficiency)
  );

  const filtered = deficiencyApps.filter(app => {
    if (filterType === 'AWAITING_STUDENT') return app.verificationStatus === 'DEFICIENCY_RAISED';
    if (filterType === 'SUBMITTED_CLARIFICATION') return app.verificationStatus === 'DEFICIENCY_RESOLVED';
    return true;
  });

  const handleOpenApp = (id) => {
    setSelectedAppId(id);
    onOpenWorkspace();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase text-rose-700">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Priority Scrutiny Management</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Deficiency Correction & Clarification Queue
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Triage portal for applications flagged with unclear scans, mismatched names, or expired certificates.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-md text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded transition ${
                filterType === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Deficiencies ({deficiencyApps.length})
            </button>
            <button
              onClick={() => setFilterType('AWAITING_STUDENT')}
              className={`px-3 py-1.5 rounded transition ${
                filterType === 'AWAITING_STUDENT' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Awaiting Student ({deficiencyApps.filter(a => a.verificationStatus === 'DEFICIENCY_RAISED').length})
            </button>
            <button
              onClick={() => setFilterType('SUBMITTED_CLARIFICATION')}
              className={`px-3 py-1.5 rounded transition ${
                filterType === 'SUBMITTED_CLARIFICATION' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Clarification Submitted ({deficiencyApps.filter(a => a.verificationStatus === 'DEFICIENCY_RESOLVED').length})
            </button>
          </div>
        </div>
      </div>

      {/* Queue Cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-slate-400 text-xs">
            No applications in the deficiency queue for this filter.
          </div>
        ) : (
          filtered.map((app) => {
            const def = app.deficiency;
            const isResolved = def?.resolved;
            return (
              <div 
                key={app.id}
                className={`bg-white rounded-lg border p-5 shadow-sm transition ${
                  isResolved ? 'border-blue-200 bg-blue-50/20' : 'border-rose-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono font-bold text-indigo-950 text-xs">{app.id}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-bold text-slate-900 text-sm">{app.applicantName}</span>
                      <span className="text-xs text-slate-500 font-mono">({app.tribe}, {app.state})</span>
                      <StatusBadge status={app.verificationStatus} type="status" size="small" />
                    </div>

                    <div className="text-xs text-slate-600">
                      Scheme: <strong className="text-slate-800">{app.schemeName}</strong> | Institution: <span className="text-slate-800">{app.institution}</span>
                    </div>

                    {/* Deficiency Box */}
                    <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-1 mt-2">
                      <div className="flex justify-between items-center text-slate-500 text-[11px]">
                        <span>
                          Notice Ref: <strong className="font-mono text-slate-700">{def?.noticeId || 'DEF-NOTICE'}</strong>
                        </span>
                        <span>
                          Deadline: <strong className="font-mono text-rose-700">{def?.deadline || '2026-10-15'}</strong>
                        </span>
                      </div>
                      <p className="text-slate-800 italic leading-relaxed">
                        Officer Remark: "{def?.officerNote || 'Document clarity or validity issue flagged.'}"
                      </p>
                    </div>

                    {/* Applicant Response Box (if submitted) */}
                    {def?.applicantResponse && (
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded p-3 text-xs space-y-1">
                        <div className="flex justify-between items-center text-emerald-900 text-[11px] font-semibold">
                          <span>✓ Applicant Rectification Received:</span>
                          <span className="font-mono">{def?.resolvedDate || 'Recent'}</span>
                        </div>
                        <p className="text-emerald-950 italic">
                          "{def.applicantResponse}"
                        </p>
                        <div className="text-[11px] font-mono text-emerald-800 mt-1">
                          Attached Fresh Document: <strong>{def.resubmittedDoc}</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 self-start lg:self-auto flex-shrink-0">
                    <button
                      onClick={() => handleOpenApp(app.id)}
                      className="px-4 py-2 bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-semibold rounded shadow-sm flex items-center justify-center space-x-1.5 transition"
                    >
                      <span>Open in Review Workspace</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {isResolved && (
                      <button
                        onClick={() => handleOpenApp(app.id)}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded shadow-sm flex items-center justify-center space-x-1.5 transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Re-Verify Corrected Doc</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
