import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_USERS } from '../../data/mockData';
import { GraduationCap, ShieldCheck, UserCheck, Check, X, ArrowRight } from 'lucide-react';

export const RoleSwitcherModal = ({ isOpen, onClose }) => {
  const { currentRole, switchRole } = useApp();

  if (!isOpen) return null;

  const roles = [
    {
      id: 'student',
      title: 'Student / Applicant Portal',
      subtitle: 'Rajeshwari Marandi (Ph.D. Scholar, Ranchi University)',
      badge: 'ST Applicant',
      icon: GraduationCap,
      color: 'blue',
      features: [
        'Explore NFST and NOS scholarship schemes',
        '8-step guided application submission wizard',
        'AI document scanner & simulated OCR extraction',
        'Real-time status tracker & deficiency resolution',
        'Post-award DBT fellowship & disbursement monitor'
      ]
    },
    {
      id: 'officer',
      title: 'Verification Officer Portal',
      subtitle: 'Dr. Arvind Soren (Scrutiny Officer - Desk 3, Eastern Zone)',
      badge: 'Desk Scrutiny Officer',
      icon: ShieldCheck,
      color: 'amber',
      features: [
        'Dedicated split-screen application review workspace',
        'Simulated OCR entity mapping & quality scores',
        'Configurable eligibility checklist validation',
        'Raise formal deficiencies with officer remarks',
        'Approve documents and forward to Scrutiny Committee'
      ]
    },
    {
      id: 'admin',
      title: 'Ministry Administrator Portal',
      subtitle: 'Sunita Nayak (Joint Secretary / Scheme Director, MoTA)',
      badge: 'Central Ministry Admin',
      icon: UserCheck,
      color: 'emerald',
      features: [
        'High-level operational dashboard & KPI charts',
        'Scheme policy rules & criteria configurator',
        'Deficiency queue triage & turnaround monitoring',
        'Scrutiny and final sanction authorization',
        'Traceable chronological audit trail & CSV export'
      ]
    }
  ];

  const handleSelectRole = (roleId) => {
    switchRole(roleId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f2537] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-mono font-bold text-amber-300">Role Selection</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">Demonstration Access</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">Switch Demonstration Persona</h2>
            <p className="text-xs text-slate-300 mt-1">
              Select any of the 3 key stakeholders to evaluate the end-to-end workflow without authentication friction.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles list */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = currentRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => handleSelectRole(role.id)}
                className={`relative bg-white rounded-lg p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected 
                    ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-md' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      role.id === 'student' ? 'bg-blue-100 text-blue-700' :
                      role.id === 'officer' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="flex items-center space-x-1 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{role.title}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{role.subtitle}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {role.features.map((feat, i) => (
                      <div key={i} className="text-[11px] text-slate-600 flex items-start space-x-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectRole(role.id);
                  }}
                  className={`mt-5 w-full py-2 px-3 rounded text-xs font-medium flex items-center justify-center space-x-1.5 transition ${
                    isSelected 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{isSelected ? 'Currently Viewing' : 'Switch to Persona'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="bg-white px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>State updates (deficiencies, document approvals, status shifts) persist seamlessly across role switches.</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
