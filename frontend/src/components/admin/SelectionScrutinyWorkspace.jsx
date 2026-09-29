import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/ConfirmModal';
import { 
  Award, 
  CheckCircle2, 
  Layers, 
  Scale, 
  UserCheck, 
  ExternalLink, 
  Download, 
  FileText, 
  Clock, 
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';

export const SelectionScrutinyWorkspace = () => {
  const { applications, awardScholarship, currentUser } = useApp();

  // Cohort eligible for scrutiny / recommended for selection
  const scrutinyCohort = applications.filter(a => 
    a.stage === 'SCRUTINY' || a.stage === 'SELECTION' || a.stage === 'AWARDED' || a.eligibilityStatus === 'ELIGIBLE'
  );

  const [selectedAppId, setSelectedAppId] = useState(scrutinyCohort[0]?.id || 'MOTA-2026-NOS-0102');
  const [awardModalOpen, setAwardModalOpen] = useState(false);
  const [awardSuccess, setAwardSuccess] = useState(false);

  const activeApp = applications.find(a => a.id === selectedAppId) || applications[0];

  // Illustrative composite merit scoring breakdown
  const academicScore = Math.min(Math.round((activeApp.masterPercentage / 100) * 40), 40); // 40 max
  const proposalScore = 26; // 30 max
  const institutionalRankScore = activeApp.schemeId === 'NOS' ? 28 : 25; // 30 max
  const compositeScore = academicScore + proposalScore + institutionalRankScore;

  const handleConfirmAward = (remark) => {
    awardScholarship(activeApp.id, null, remark);
    setAwardModalOpen(false);
    setAwardSuccess(true);
    setTimeout(() => setAwardSuccess(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase text-emerald-800">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Central Selection & Scrutiny Committee</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Merit Evaluation & Sanction Authorization Workspace
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Transparent screening matrix for candidates who cleared Document Verification and Statutory Eligibility.
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-2.5 py-1.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 self-start sm:self-auto">
            {scrutinyCohort.length} Verified Candidates in Scrutiny Cohort
          </span>
        </div>

        {/* Mandatory Transparency Notice as requested by prompt */}
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-700 flex items-start space-x-2">
          <Info className="w-4 h-4 text-[#1b365d] flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-900 font-semibold">Statutory Selection Safeguard:</strong> The merit calculation displayed below is an illustrative demonstration screening matrix (Academic Weightage: 40%, Research Proposal: 30%, Institution Tier: 30%). In strict accordance with Ministry guidelines, <strong>AI algorithms do not select candidates</strong>; final scholarship allocation requires unanimous human approval by the Central Selection Committee.
          </div>
        </div>
      </div>

      {awardSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-xs text-emerald-900 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-bold">
            Scholarship Sanction Order successfully issued and linked to Public Financial Management System (PFMS) for DBT disbursement.
          </span>
        </div>
      )}

      {/* Main Grid: Cohort Selector (Left 4 cols) & Merit Matrix / Decision (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Eligible Candidates List */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 p-4 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">
            Eligible Cohort Queue ({scrutinyCohort.length})
          </h3>

          <div className="space-y-2">
            {scrutinyCohort.map((c) => {
              const isSelected = selectedAppId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedAppId(c.id)}
                  className={`p-3 rounded border text-xs cursor-pointer transition ${
                    isSelected 
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-indigo-950">{c.id}</span>
                    <StatusBadge status={c.stage} type="stage" size="small" />
                  </div>
                  <div className="font-bold text-slate-900">{c.applicantName}</div>
                  <div className="text-[11px] text-slate-500 truncate">{c.institution}</div>
                  <div className="mt-2 text-[11px] flex justify-between text-slate-600 pt-1.5 border-t border-slate-100">
                    <span>{c.schemeId} • {c.tribe}</span>
                    <span className="font-mono font-semibold text-emerald-800">{c.masterPercentage}% Agg.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Candidate Screening Breakdown & Sanction Action */}
        <div className="lg:col-span-8 space-y-5">
          {/* Candidate Dossier Overview */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono text-indigo-700 font-bold uppercase">{activeApp.schemeName}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{activeApp.applicantName}</h3>
                <p className="text-xs text-slate-500">
                  Tribe: <strong className="text-slate-800">{activeApp.tribe}</strong> | Domicile: <strong className="text-slate-800">{activeApp.state}</strong> | Income: <strong className="text-slate-800">₹{activeApp.annualFamilyIncome.toLocaleString('en-IN')}</strong>
                </p>
              </div>
              <StatusBadge status={activeApp.stage} type="stage" />
            </div>

            {/* Illustrative Merit Score Card */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Screening Score Matrix (Demonstration Calculation)
                </span>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  Composite Score: {compositeScore} / 100
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="text-slate-500">Academic Score (40%):</span>
                  <div className="text-base font-bold text-slate-900 mt-1">{academicScore} / 40</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{activeApp.masterPercentage}% in Master's</div>
                </div>

                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="text-slate-500">Research Alignment (30%):</span>
                  <div className="text-base font-bold text-slate-900 mt-1">{proposalScore} / 30</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">National Tribal Priority Topic</div>
                </div>

                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <span className="text-slate-500">University Tier (30%):</span>
                  <div className="text-base font-bold text-slate-900 mt-1">{institutionalRankScore} / 30</div>
                  <div className="text-[11px] text-slate-600 mt-0.5">Top Accredited Institution</div>
                </div>
              </div>
            </div>

            {/* Credential Clearance Checklist */}
            <div className="border border-slate-200 rounded p-3.5 bg-slate-50/50 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wide block mb-1">
                Completed Verification Milestones:
              </span>
              <div className="flex items-center space-x-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All {activeApp.documents.length} mandatory documents verified and matched against digital records</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Statutory ST identity and income criteria validated</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Supervisor and Registrar full-time enrollment verified</span>
              </div>
            </div>

            {/* Committee Recommendation & Sanction CTA */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs text-slate-500">
                Authorizing Official: <strong className="text-slate-800">{currentUser.name} ({currentUser.role.replace('_', ' ')})</strong>
              </div>

              {activeApp.stage === 'AWARDED' ? (
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sanction Order Issued ({activeApp.awardDetails?.sanctionNumber || 'MOTA/2026/AW-0042'})</span>
                </div>
              ) : (
                <button
                  onClick={() => setAwardModalOpen(true)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded shadow-sm flex items-center space-x-2 transition"
                >
                  <Award className="w-4 h-4" />
                  <span>Approve Selection & Authorize Sanction Order</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={awardModalOpen}
        onClose={() => setAwardModalOpen(false)}
        onConfirm={handleConfirmAward}
        title={`Authorize Fellowship Sanction: ${activeApp.applicantName}`}
        message={`Confirm that the Central Selection Committee has approved ${activeApp.applicantName} for the ${activeApp.schemeName}. Authorizing this will generate an official Sanction Order, register the scholar in PFMS, and schedule DBT installments.`}
        confirmText="Authorize & Sign Sanction Order"
        requireRemarks={true}
        presetReasons={[
          'Recommended by Central Selection Committee based on academic merit and research priority',
          'Cleared all scrutiny parameters with top bracket composite score',
          'Approved under National Overseas Scholarship (NOS) 2026-27 annual quota'
        ]}
        remarksPlaceholder="Enter official selection committee endorsement remarks..."
      />
    </div>
  );
};
