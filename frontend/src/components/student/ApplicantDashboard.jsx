import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  FileText, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  CreditCard, 
  Award, 
  User, 
  Building, 
  ExternalLink,
  Info,
  ShieldCheck
} from 'lucide-react';

const STAGES = [
  { key: 'DRAFT', label: 'Draft' },
  { key: 'SUBMITTED', label: 'Submitted' },
  { key: 'DOCUMENT_VERIFICATION', label: 'Document Verification' },
  { key: 'ELIGIBILITY_REVIEW', label: 'Eligibility Review' },
  { key: 'SCRUTINY', label: 'Scrutiny Committee' },
  { key: 'SELECTION', label: 'Selection' },
  { key: 'AWARDED', label: 'Awarded & DBT' }
];

export const ApplicantDashboard = ({ onNavigate }) => {
  const { currentUser, applications, schemes } = useApp();

  // Find applicant's primary application (default to Rajeshwari Marandi's app)
  const myApp = applications.find(a => a.id === 'MOTA-2026-NFST-0101') || applications[0];
  const scheme = schemes.find(s => s.id === myApp.schemeId) || schemes[0];

  // Helper to determine stage index
  const getStageIndex = (stageKey) => {
    const idx = STAGES.findIndex(s => s.key === stageKey);
    return idx === -1 ? 2 : idx;
  };

  const currentStageIndex = getStageIndex(myApp.stage);

  return (
    <div className="space-y-6">
      {/* 1. Welcome Header Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Applicant Portal • MoTA
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-mono">ID: {currentUser.id}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Welcome, {currentUser.name}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Scheduled Tribe: <span className="font-semibold text-slate-800">{currentUser.tribe}</span> | Domicile: <span className="font-semibold text-slate-800">{currentUser.state}</span> | Registration: <span className="font-semibold text-slate-800 font-mono">{myApp.id}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start md:self-auto">
            <button
              onClick={() => onNavigate('track')}
              className="px-3.5 py-2 rounded-md bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-medium flex items-center space-x-1.5 shadow-sm transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Track Application Lifecycle</span>
            </button>
            <button
              onClick={() => onNavigate('schemes')}
              className="px-3.5 py-2 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-medium flex items-center space-x-1.5 transition"
            >
              <span>Explore Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Critical Action / Deficiency Alert Card (if deficiency exists and not yet resolved) */}
      {myApp.deficiency && myApp.deficiency.hasDeficiency && !myApp.deficiency.resolved && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-amber-900">
                    Deficiency Notice Issued - Action Required by Applicant
                  </h3>
                  <span className="text-[11px] font-mono bg-amber-200/80 text-amber-900 px-2 py-0.2 rounded font-semibold">
                    Ref: {myApp.deficiency.noticeId}
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  <span className="font-semibold">Officer Scrutiny Remark:</span> "{myApp.deficiency.officerNote}"
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-amber-900">
                  <span>📅 Response Deadline: <strong className="font-semibold text-rose-700">{myApp.deficiency.deadline}</strong></span>
                  <span>•</span>
                  <span>Desk: <strong>{myApp.assignedDesk}</strong></span>
                  <span>•</span>
                  <span>Officer: <strong>{myApp.deficiency.raisedBy}</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('track')}
              className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center space-x-1.5 flex-shrink-0 shadow-sm transition"
            >
              <span>Upload Corrected Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Deficiency Resolved Banner (if resolved and awaiting verification) */}
      {myApp.deficiency && myApp.deficiency.resolved && myApp.verificationStatus === 'DEFICIENCY_RESOLVED' && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-blue-900">
                Clarification Document Submitted Successfully
              </h3>
              <p className="text-xs text-blue-800 mt-0.5">
                You uploaded a revised document with remark: <span className="italic font-medium">"{myApp.deficiency.applicantResponse}"</span>. Your application has been routed back to {myApp.assignedOfficer} for re-scrutiny.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Active Scheme & 7-Stage Progress Tracker */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase">Active Application</div>
            <h3 className="text-base font-bold text-slate-900">{myApp.schemeName}</h3>
            <p className="text-xs text-slate-600">
              Discipline: <span className="font-medium text-slate-800">{myApp.researchTopic}</span> ({myApp.institution})
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <StatusBadge status={myApp.stage} type="stage" />
            <StatusBadge status={myApp.verificationStatus} type="status" />
          </div>
        </div>

        {/* 7-Stage Visual Progress Tracker */}
        <div className="pt-6 pb-2">
          <div className="text-xs font-semibold text-slate-700 mb-4 flex items-center justify-between">
            <span>Official Application Scrutiny Stages</span>
            <span className="text-[11px] font-mono text-slate-500">
              Stage {currentStageIndex + 1} of {STAGES.length}
            </span>
          </div>

          <div className="relative">
            {/* Connecting Bar */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-slate-200 z-0">
              <div 
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
              ></div>
            </div>

            {/* Stage nodes */}
            <div className="relative z-10 flex justify-between items-start">
              {STAGES.map((stg, idx) => {
                const isCompleted = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const isDeficientHere = isCurrent && myApp.verificationStatus === 'DEFICIENCY_RAISED';

                return (
                  <div key={stg.key} className="flex flex-col items-center text-center w-24">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs border-2 transition-all ${
                      isDeficientHere
                        ? 'bg-rose-50 border-rose-600 text-rose-700 ring-4 ring-rose-100'
                        : isCompleted 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : isCurrent 
                            ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100' 
                            : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isDeficientHere ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className={`text-[11px] mt-2 font-medium leading-tight ${
                      isDeficientHere ? 'text-rose-700 font-bold' : isCurrent ? 'text-blue-900 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {stg.label}
                    </span>
                    {isCurrent && (
                      <span className={`text-[9px] uppercase font-mono px-1 py-0.2 rounded mt-1 ${
                        isDeficientHere ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        Current
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Three Columns Info Grid: Scheme Benefits, Deadlines, and Direct Support */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Financial Assistance & Entitlement */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-700 mb-2">
              <CreditCard className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Sanctioned Financial Assistance</h4>
            </div>
            <div className="text-lg font-bold text-slate-900">
              {myApp.schemeId === 'NFST' ? '₹31,000 / month' : '$15,400 / year'}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {myApp.schemeId === 'NFST' 
                ? 'Junior Research Fellowship (JRF) + HRA + Contingency' 
                : 'Annual Maintenance Allowance + Full Tuition'}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Direct Benefit Transfer (DBT):</span>
                <span className="font-semibold text-emerald-700">PFMS Aadhaar-Seeded</span>
              </div>
              <div className="flex justify-between">
                <span>Sanction Status:</span>
                <span className="font-semibold text-slate-800">
                  {myApp.stage === 'AWARDED' ? 'Active / Disbursing' : 'Subject to Scrutiny Clearance'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('fellowship')}
            className="mt-4 w-full py-1.5 text-xs font-medium text-slate-700 hover:text-indigo-700 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition text-center"
          >
            View DBT & Disbursement Details
          </button>
        </div>

        {/* Column 2: Key Deadlines */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-amber-700 mb-2">
              <Calendar className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Critical Deadlines</h4>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Deficiency Correction Window</div>
                  <div className="text-slate-500 text-[11px]">Upload rectified certificates</div>
                </div>
                <span className="font-mono font-bold text-rose-600 text-xs">
                  {myApp.deficiency ? myApp.deficiency.deadline : '2026-10-15'}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Central Scrutiny Committee</div>
                  <div className="text-slate-500 text-[11px]">Final screening of eligible cohort</div>
                </div>
                <span className="font-mono text-slate-700 text-xs">2026-11-20</span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Selection List Release</div>
                  <div className="text-slate-500 text-[11px]">Notification on Ministry portal</div>
                </div>
                <span className="font-mono text-slate-700 text-xs">2026-12-05</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span>Deadlines strictly adhered as per MoTA Gazette</span>
          </div>
        </div>

        {/* Column 3: Ministry Assistance & Grievance */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-slate-700 mb-2">
              <Building className="w-4 h-4 text-[#1b365d]" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Scrutiny Desk Details</h4>
            </div>
            <div className="text-xs space-y-1.5 text-slate-600">
              <p>
                <span className="text-slate-500">Assigned Desk:</span> <strong className="text-slate-800">{myApp.assignedDesk}</strong>
              </p>
              <p>
                <span className="text-slate-500">Scrutiny Officer:</span> <strong className="text-slate-800">{myApp.assignedOfficer}</strong>
              </p>
              <p>
                <span className="text-slate-500">Helpline:</span> <span className="font-mono font-medium text-slate-800">1800-11-7788 (Toll Free)</span>
              </p>
              <p>
                <span className="text-slate-500">Portal Email:</span> <span className="font-mono text-indigo-700">fellowship-mota@gov.in</span>
              </p>
            </div>
          </div>

          <div className="mt-4 bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-600">
            For technical issues with digital signature or OCR parsing, use the <span className="font-semibold text-slate-800">Deficiency Response tab</span>.
          </div>
        </div>
      </div>
    </div>
  );
};
