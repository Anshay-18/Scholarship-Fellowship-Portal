import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Info, 
  Calendar, 
  FileText, 
  GraduationCap, 
  IndianRupee,
  Layers,
  Settings
} from 'lucide-react';

export const SchemeRulesConfigurator = () => {
  const { schemes, updateSchemeRule } = useApp();

  const [activeSchemeId, setActiveSchemeId] = useState('NFST');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeScheme = schemes.find(s => s.id === activeSchemeId) || schemes[0];

  // Local editable state for active scheme rules
  const [formRules, setFormRules] = useState({ ...activeScheme.rules });
  const [formDates, setFormDates] = useState({ ...activeScheme.applicationWindow });
  const [formSlots, setFormSlots] = useState(activeScheme.slots);

  // When switching schemes
  const handleSwitchScheme = (id) => {
    setActiveSchemeId(id);
    const target = schemes.find(s => s.id === id) || schemes[0];
    setFormRules({ ...target.rules });
    setFormDates({ ...target.applicationWindow });
    setFormSlots(target.slots);
    setSaveSuccess(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSchemeRule(activeSchemeId, {
      ...formRules,
      slots: parseInt(formSlots, 10),
      applicationWindow: formDates
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase text-indigo-700">
              <Settings className="w-4 h-4" />
              <span>Policy & Eligibility Engine</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Configurable Scheme Rules & Evaluation Parameters
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Administratively define eligibility criteria, income thresholds, mandatory document checklists, and application deadlines.
            </p>
          </div>

          {/* Scheme Switcher Buttons */}
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            {schemes.map(s => (
              <button
                key={s.id}
                onClick={() => handleSwitchScheme(s.id)}
                className={`px-3.5 py-2 rounded-md text-xs font-semibold transition ${
                  activeSchemeId === s.id
                    ? 'bg-[#1b365d] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {s.id} ({s.slots} Slots)
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900 flex items-start space-x-2">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Configurable Policy Demonstration:</strong> Changes made here immediately update rule validation in both the Student Application Wizard and the Officer Scrutiny Workspace without altering source code.
          </span>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-xs text-emerald-900 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-bold">
            Policy rules successfully updated in live portal memory and logged to immutable audit ledger.
          </span>
        </div>
      )}

      {/* Rules Editor Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Academic & Age Criteria */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-indigo-700" />
            <span>Academic Thresholds & Age Limits ({activeScheme.name})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Minimum Master's Degree Percentage (%):
              </label>
              <input
                type="number"
                value={formRules.minMasterMarks}
                onChange={(e) => setFormRules({ ...formRules, minMasterMarks: parseFloat(e.target.value) })}
                className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                min="40"
                max="100"
                step="0.5"
                required
              />
              <p className="text-[11px] text-slate-500 mt-0.5">Statutory relaxation for ST candidates</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Maximum Age Limit (Years):
              </label>
              <input
                type="number"
                value={formRules.maxAge}
                onChange={(e) => setFormRules({ ...formRules, maxAge: parseInt(e.target.value, 10) })}
                className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                min="25"
                max="50"
                required
              />
              <p className="text-[11px] text-slate-500 mt-0.5">As on cut-off date of application year</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Annual Fellowship Quota (Slots):
              </label>
              <input
                type="number"
                value={formSlots}
                onChange={(e) => setFormSlots(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                min="1"
                required
              />
              <p className="text-[11px] text-slate-500 mt-0.5">Approved annual cohort allocation</p>
            </div>
          </div>
        </div>

        {/* Section 2: Income Ceiling & Financial Criteria */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center space-x-2">
            <IndianRupee className="w-4 h-4 text-emerald-700" />
            <span>Economic & Income Ceiling Parameters</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Statutory Annual Family Income Ceiling (₹):
              </label>
              <input
                type="number"
                value={formRules.incomeCeiling}
                onChange={(e) => setFormRules({ ...formRules, incomeCeiling: parseInt(e.target.value, 10) })}
                className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                step="50000"
                required
              />
              <p className="text-[11px] text-slate-500 mt-0.5">
                {formRules.incomeCeiling === 0 ? '0 indicates no income ceiling applies (NFST guidelines)' : `Currently set to ₹${formRules.incomeCeiling.toLocaleString('en-IN')}`}
              </p>
            </div>

            {formRules.maxQsRank && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Foreign University Maximum QS World Rank:
                </label>
                <input
                  type="number"
                  value={formRules.maxQsRank}
                  onChange={(e) => setFormRules({ ...formRules, maxQsRank: parseInt(e.target.value, 10) })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                  min="50"
                  max="1000"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-0.5">Mandated ranking bracket for overseas institutions</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Application Window & Deadlines */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>Application Timeline & Scrutiny Window</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Portal Opening Date:
              </label>
              <input
                type="date"
                value={formDates.startDate}
                onChange={(e) => setFormDates({ ...formDates, startDate: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Application Final Deadline:
              </label>
              <input
                type="date"
                value={formDates.endDate}
                onChange={(e) => setFormDates({ ...formDates, endDate: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Deficiency Correction Cut-off:
              </label>
              <input
                type="date"
                value={formDates.correctionDeadline}
                onChange={(e) => setFormDates({ ...formDates, correctionDeadline: e.target.value })}
                className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Required Documents Checklist */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-slate-700" />
            <span>Mandatory Document Checklist for {activeScheme.id}</span>
          </h3>

          <div className="space-y-2 text-xs">
            {activeScheme.requiredDocuments.map((doc) => (
              <div key={doc.id} className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">{doc.name}</span>
                  <div className="text-[11px] text-slate-500">Authorized: {doc.authority}</div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Mandatory Condition
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-bold flex items-center space-x-2 shadow-sm transition"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Scheme Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
