import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  CreditCard, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Upload, 
  Send, 
  Building2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const FellowshipManagement = () => {
  const { applications, currentUser } = useApp();

  // Find awarded application (Sneha Naik or current active)
  const awardedApp = applications.find(a => a.stage === 'AWARDED') || applications.find(a => a.id === 'MOTA-2026-NOS-0107') || applications[0];

  const [qprFile, setQprFile] = useState(null);
  const [qprSubmitted, setQprSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('sanction');

  const awardInfo = awardedApp.awardDetails || {
    sanctionNumber: 'MOTA/NFST/2026/AW-0042',
    sanctionDate: '2026-08-15',
    sanctionedBy: 'Sunita Nayak, Joint Secretary (MoTA)',
    awardedDurationYears: 5,
    annualAllowanceEuro: '₹3,72,000 / annum (₹31,000/mo)',
    tuitionFeeCovered: '100% University Fees Exempt',
    pfmsDbtLinked: true,
    bankAccountMasked: 'State Bank of India - A/C XXXXXXXX4821 (Aadhaar Seeded)',
    disbursementHistory: [
      { installment: 'Installment 1 (Q1)', amount: '₹93,000', date: '2026-09-01', status: 'DISBURSED', utr: 'PFMS-DBT-20260901-7789' },
      { installment: 'Installment 2 (Q2)', amount: '₹93,000', date: '2026-12-01', status: 'SCHEDULED', utr: 'Scheduled upon QPR approval' }
    ]
  };

  const handleQprSubmit = (e) => {
    e.preventDefault();
    setQprSubmitted(true);
    setTimeout(() => setQprSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Official Sanction Order Active
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-mono">Sanction No: {awardInfo.sanctionNumber}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Fellowship Grant & Direct Benefit Transfer (DBT) Portal
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Awardee: <strong className="text-slate-900">{awardedApp.applicantName}</strong> | Scheme: <strong className="text-slate-900">{awardedApp.schemeName}</strong> ({awardedApp.institution})
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official Sanction Letter (PDF)</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sanction Tenure</div>
          <div className="text-xl font-bold text-slate-900 mt-1">{awardInfo.awardedDurationYears} Academic Years</div>
          <p className="text-xs text-slate-600 mt-0.5">Subject to satisfactory annual progress appraisal</p>
          <div className="mt-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
            Sanctioned Date: <strong className="text-slate-800">{awardInfo.sanctionDate}</strong>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sanctioned Financial Grant</div>
          <div className="text-xl font-bold text-emerald-800 mt-1">{awardInfo.annualAllowanceEuro}</div>
          <p className="text-xs text-slate-600 mt-0.5">+ Contingency Allowance & HRA (Central Norms)</p>
          <div className="mt-3 text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>Tuition Status:</span>
            <span className="font-semibold text-emerald-700">100% Covered</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">PFMS / DBT Status</div>
          <div className="text-sm font-bold text-emerald-800 mt-1 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
            <span>Aadhaar-Seeded DBT Active</span>
          </div>
          <p className="text-xs font-mono text-slate-600 mt-0.5">{awardInfo.bankAccountMasked}</p>
          <div className="mt-3 text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span>NPCI Mapping:</span>
            <span className="font-semibold text-emerald-700">✓ Verified</span>
          </div>
        </div>
      </div>

      {/* Installment History & Renewal Requirements Tabs */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sanction')}
            className={`px-5 py-3 border-b-2 transition ${
              activeTab === 'sanction'
                ? 'border-indigo-600 text-indigo-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Direct Benefit Transfer (DBT) Installment History
          </button>
          <button
            onClick={() => setActiveTab('qpr')}
            className={`px-5 py-3 border-b-2 transition ${
              activeTab === 'qpr'
                ? 'border-indigo-600 text-indigo-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Quarterly Progress Report (QPR) & Renewal Requirements
          </button>
        </div>

        {activeTab === 'sanction' ? (
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Installment</th>
                    <th className="px-4 py-3">Disbursed Amount</th>
                    <th className="px-4 py-3">Credit Date</th>
                    <th className="px-4 py-3">Payment Status</th>
                    <th className="px-4 py-3">PFMS / RBI Reference UTR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {awardInfo.disbursementHistory.map((inst, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-900">{inst.installment}</td>
                      <td className="px-4 py-3 font-mono font-bold text-emerald-800">{inst.amount}</td>
                      <td className="px-4 py-3 font-mono text-slate-600">{inst.date}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                          inst.status === 'DISBURSED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {inst.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-600">{inst.utr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span>Next disbursement requires submission and supervisor endorsement of Q2 Progress Report.</span>
              <span className="font-mono text-slate-500">Gateway: PFMS-MoTA-Central</span>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Quarterly Progress Report (QPR) & Fellowship Renewal
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Scholars must upload the signed quarterly progress certificate endorsed by the Research Supervisor and Registrar to authorize subsequent DBT stipends.
              </p>
            </div>

            {qprSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold">Quarterly Progress Report Uploaded Successfully</span>
                  <p className="text-emerald-800 mt-0.5">
                    Forwarded to MoTA Higher Education Division for renewal clearance.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQprSubmit} className="space-y-4 bg-slate-50 p-4 rounded border border-slate-200 text-xs">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Select Endorsed QPR Document (PDF format with Supervisor Stamp) <span className="text-rose-600">*</span>:
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setQprFile(e.target.files[0])}
                    className="w-full border border-slate-300 rounded p-2 bg-white text-slate-800"
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    File must include: Coursework marksheets, research publications, and guide satisfactory remarks.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Research Summary / Milestone Achieved During Quarter:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter brief summary of chapters completed, field work conducted, or papers presented..."
                    className="w-full border border-slate-300 rounded p-2 bg-white text-slate-800"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1b365d] hover:bg-[#0f2537] text-white font-bold rounded text-xs flex items-center space-x-1.5 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Submit Progress Report for Renewal</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
