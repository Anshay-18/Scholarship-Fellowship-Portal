import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ChevronRight, ChevronLeft, Play, Sparkles, X, RotateCcw } from 'lucide-react';

export const DEMO_STEPS = [
  { step: 1, title: 'Open Student Portal', role: 'student', tab: 'dashboard', desc: 'Welcome applicant Rajeshwari Marandi, overview of NFST active application' },
  { step: 2, title: 'Browse Schemes', role: 'student', tab: 'schemes', desc: 'Review NFST & NOS scheme rules, eligibility criteria, and required documents' },
  { step: 3, title: 'Application Wizard', role: 'student', tab: 'apply', desc: 'Guided 8-step application flow with validation and draft state' },
  { step: 4, title: 'Upload Document', role: 'student', tab: 'apply', desc: 'Select sample ST / Income certificate to test document processing' },
  { step: 5, title: 'AI OCR & Mismatch', role: 'student', tab: 'apply', desc: 'Simulated OCR extraction highlighting advisory flag & date/seal check' },
  { step: 6, title: 'Submit Application', role: 'student', tab: 'apply', desc: 'Review declaration, generate reference number MOTA/2026/NFST/0101' },
  { step: 7, title: 'Track Deficiency', role: 'student', tab: 'track', desc: 'View official timeline and active deficiency alert from Ministry desk' },
  { step: 8, title: 'Switch to Officer', role: 'officer', tab: 'workspace', desc: 'Log in as Dr. Arvind Soren (Verification Officer - Desk 3)' },
  { step: 9, title: 'Open Review Workspace', role: 'officer', tab: 'workspace', desc: 'Inspect side-by-side dossier: applicant form, doc preview & OCR' },
  { step: 10, title: 'Check Eligibility Rules', role: 'officer', tab: 'workspace', desc: 'Evaluate rule-based checklist against scheme policy parameters' },
  { step: 11, title: 'Raise Deficiency', role: 'officer', tab: 'workspace', desc: 'Issue formal notice with officer remark requesting fresh FY25-26 certificate' },
  { step: 12, title: 'Student Resolves', role: 'student', tab: 'track', desc: 'Student uploads fresh Tehsildar certificate with clarification remarks' },
  { step: 13, title: 'Officer Verifies', role: 'officer', tab: 'workspace', desc: 'Officer reviews corrected document and marks verification complete' },
  { step: 14, title: 'Forward to Scrutiny', role: 'officer', tab: 'workspace', desc: 'Eligibility approved; application routed to Central Scrutiny Committee' },
  { step: 15, title: 'Audit Trail & Metrics', role: 'admin', tab: 'analytics', desc: 'Review administrative audit ledger, dashboard metrics & CSV export' }
];

export const DemoHelperBar = ({ currentTab, onNavigate }) => {
  const { 
    currentRole, 
    switchRole, 
    demoStep, 
    setDemoStep, 
    isDemoGuideOpen, 
    setIsDemoGuideOpen,
    setSelectedAppId,
    resetToDefaultData 
  } = useApp();

  if (!isDemoGuideOpen) return null;

  const currentStepObj = DEMO_STEPS.find(s => s.step === demoStep) || DEMO_STEPS[0];

  const handleStepJump = (targetStep) => {
    setDemoStep(targetStep);
    const targetObj = DEMO_STEPS.find(s => s.step === targetStep);
    if (targetObj) {
      if (currentRole !== targetObj.role) {
        switchRole(targetObj.role);
      }
      setSelectedAppId('MOTA-2026-NFST-0101');
      if (onNavigate && targetObj.tab) {
        onNavigate(targetObj.tab);
      }
    }
  };

  const nextStep = () => {
    if (demoStep < DEMO_STEPS.length) {
      handleStepJump(demoStep + 1);
    }
  };

  const prevStep = () => {
    if (demoStep > 1) {
      handleStepJump(demoStep - 1);
    }
  };

  return (
    <div className="bg-slate-900 border-b border-amber-500/40 text-white px-4 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
        {/* Left: Step counter & description */}
        <div className="flex items-start sm:items-center space-x-3">
          <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold text-xs">
            {currentStepObj.step}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-mono font-bold text-amber-400">
                SIH 2026 Demo Step {currentStepObj.step} of 15
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-100">{currentStepObj.title}</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Role: {currentStepObj.role}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
              {currentStepObj.desc}
            </p>
          </div>
        </div>

        {/* Right: Controls & Navigation */}
        <div className="flex items-center flex-wrap gap-2 self-end lg:self-auto">
          {/* Quick Step Stepper */}
          <div className="flex items-center space-x-1">
            <button
              onClick={prevStep}
              disabled={demoStep === 1}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs flex items-center text-slate-200"
              title="Previous Demo Step"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
              <span>Back</span>
            </button>
            <button
              onClick={nextStep}
              disabled={demoStep === DEMO_STEPS.length}
              className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs flex items-center shadow-sm"
              title="Next Demo Step"
            >
              <span>Next Demo Action</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          {/* Quick jump dropdown */}
          <select
            value={demoStep}
            onChange={(e) => handleStepJump(parseInt(e.target.value, 10))}
            className="bg-slate-800 border border-slate-700 rounded text-xs px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-400"
          >
            {DEMO_STEPS.map((s) => (
              <option key={s.step} value={s.step}>
                Step {s.step}: {s.title} ({s.role})
              </option>
            ))}
          </select>

          {/* Close button */}
          <button
            onClick={() => setIsDemoGuideOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            title="Dismiss Demo Bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
