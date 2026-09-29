import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Globe, 
  Calendar, 
  CheckCircle, 
  FileText, 
  Info, 
  ArrowRight, 
  Check, 
  ExternalLink,
  X,
  IndianRupee,
  Users
} from 'lucide-react';

export const SchemeDiscovery = ({ onSelectSchemeToApply }) => {
  const { schemes } = useApp();
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState(null);

  return (
    <div className="space-y-6">
      {/* Title & Institutional Notice */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Centrally Sponsored Scholarship & Fellowship Schemes
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Flagship higher education assistance programs administered by the Ministry of Tribal Affairs, Government of India.
            </p>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
            Academic Year 2026–27
          </span>
        </div>

        {/* Disclaimer Banner as required by prompt */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900 flex items-start space-x-2">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Demonstration Notice:</strong> All scheme parameters, income ceilings, stipend slabs, and dates shown below are illustrative demonstration data formulated for the Smart India Hackathon 2026 prototype evaluation. Please refer to official Gazette notifications on tribal.nic.in for statutory guidelines.
          </p>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schemes.map((scheme) => {
          const isNos = scheme.id === 'NOS';
          return (
            <div 
              key={scheme.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
            >
              {/* Header card banner */}
              <div className={`p-5 border-b border-slate-100 ${
                isNos ? 'bg-gradient-to-r from-teal-900 to-slate-900 text-white' : 'bg-gradient-to-r from-[#1b365d] to-slate-900 text-white'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase bg-white/10 px-2 py-0.5 rounded border border-white/20">
                    {scheme.code}
                  </span>
                  <span className="text-xs font-semibold bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-mono">
                    {scheme.slots} Annual Slots
                  </span>
                </div>
                <h3 className="text-base font-bold tracking-tight text-white">{scheme.name}</h3>
                <p className="text-xs text-amber-300 font-hindi mt-0.5">{scheme.hindiName}</p>
                <div className="mt-3 flex items-center space-x-4 text-xs text-slate-300">
                  <span className="flex items-center space-x-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Level: <strong>{scheme.level}</strong></span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>Deadline: <strong>{scheme.applicationWindow.endDate}</strong></span>
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 flex-1">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Target Beneficiaries</h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">{scheme.targetAudience}</p>
                </div>

                {/* Financial overview */}
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-2 flex items-center">
                    <IndianRupee className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    Key Financial Assistance
                  </h4>
                  <div className="space-y-1 text-xs text-slate-700">
                    {isNos ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Maintenance:</span>
                          <span className="font-semibold text-slate-900">{scheme.financialAssistance.annualMaintenanceUS}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Tuition & Airfare:</span>
                          <span className="font-semibold text-slate-900">100% Covered + Economy Return Flight</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">JRF Monthly Stipend:</span>
                          <span className="font-semibold text-emerald-800">{scheme.financialAssistance.jrfStipend}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">SRF Monthly Stipend:</span>
                          <span className="font-semibold text-emerald-800">{scheme.financialAssistance.srfStipend}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Eligibility overview bullets */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1.5">Key Eligibility Criteria</h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {scheme.eligibilityOverview.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Documents */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1">
                    Mandatory Credentials ({scheme.requiredDocuments.length} Documents)
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.requiredDocuments.map((doc) => (
                      <span key={doc.id} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {doc.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 pt-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedSchemeForModal(scheme)}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded bg-white hover:bg-slate-100 transition"
                >
                  View Full Guidelines & Rules
                </button>

                <button
                  onClick={() => onSelectSchemeToApply(scheme.id)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#1b365d] hover:bg-[#0f2537] rounded flex items-center space-x-1.5 shadow-sm transition"
                >
                  <span>Apply Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guidelines Modal */}
      {selectedSchemeForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="bg-[#0f2537] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-amber-300 uppercase">{selectedSchemeForModal.code}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedSchemeForModal.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedSchemeForModal(null)}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="bg-amber-50 p-2.5 rounded border border-amber-200 text-amber-900 font-mono text-[11px]">
                {selectedSchemeForModal.disclaimer}
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">Detailed Eligibility Rules</h4>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Minimum Qualifying Marks:</span>
                    <span className="font-semibold text-slate-900">{selectedSchemeForModal.rules.minMasterMarks}% aggregate for ST category</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Maximum Age Limit:</span>
                    <span className="font-semibold text-slate-900">{selectedSchemeForModal.rules.maxAge} Years (inclusive of ST relaxation)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Family Income Ceiling:</span>
                    <span className="font-semibold text-slate-900">
                      {selectedSchemeForModal.rules.incomeCeiling === 0 ? 'No income ceiling' : `₹${selectedSchemeForModal.rules.incomeCeiling.toLocaleString('en-IN')} per annum`}
                    </span>
                  </div>
                  {selectedSchemeForModal.rules.maxQsRank && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Foreign University Ranking:</span>
                      <span className="font-semibold text-slate-900">Must be ranked within Top {selectedSchemeForModal.rules.maxQsRank} QS World Rankings</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">Financial Assistance Breakdown</h4>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1.5">
                  {Object.entries(selectedSchemeForModal.financialAssistance).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-600 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium text-slate-900">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">Checklist of Mandated Certificates</h4>
                <div className="space-y-1.5">
                  {selectedSchemeForModal.requiredDocuments.map((doc) => (
                    <div key={doc.id} className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-900">{doc.name}</div>
                        <div className="text-[11px] text-slate-500">Authorized: {doc.authority}</div>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Mandatory
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-between items-center">
              <span className="text-[11px] text-slate-500">Application Window Closes on {selectedSchemeForModal.applicationWindow.endDate}</span>
              <button
                onClick={() => {
                  const id = selectedSchemeForModal.id;
                  setSelectedSchemeForModal(null);
                  onSelectSchemeToApply(id);
                }}
                className="px-4 py-2 bg-[#1b365d] hover:bg-[#0f2537] text-white font-bold text-xs rounded"
              >
                Proceed to Online Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
