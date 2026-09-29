import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  PieChart, 
  FileSpreadsheet,
  FileCheck2
} from 'lucide-react';

export const ReportsAnalytics = () => {
  const { applications } = useApp();

  const handleExportFullCSV = () => {
    const headers = [
      'Application ID', 'Applicant Name', 'Father Name', 'Scheme ID', 'Study Level',
      'Tribe', 'State', 'District', 'University', 'Master Percentage',
      'Family Income', 'Submission Date', 'Stage', 'Verification Status',
      'Eligibility Status', 'Assigned Officer'
    ];
    const rows = applications.map(a => [
      `"${a.id}"`,
      `"${a.applicantName}"`,
      `"${a.fatherName}"`,
      `"${a.schemeId}"`,
      `"${a.studyLevel}"`,
      `"${a.tribe}"`,
      `"${a.state}"`,
      `"${a.district}"`,
      `"${a.institution.replace(/"/g, '""')}"`,
      `"${a.masterPercentage}"`,
      `"${a.annualFamilyIncome}"`,
      `"${a.submissionDate}"`,
      `"${a.stage}"`,
      `"${a.verificationStatus}"`,
      `"${a.eligibilityStatus}"`,
      `"${a.assignedOfficer}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MoTA_Comprehensive_Scholarship_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase text-indigo-700">
              <BarChart3 className="w-4 h-4" />
              <span>Executive Reporting Engine</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Ministry Performance Reports & Fellowship Analytics
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Throughput metrics, processing latency benchmarks, and geographical inclusion analytics.
            </p>
          </div>

          <button
            onClick={handleExportFullCSV}
            className="px-4 py-2 bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-bold rounded shadow-sm flex items-center space-x-2 transition self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Master Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Performance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Average Verification TAT</div>
          <div className="text-2xl font-bold text-indigo-900 mt-1">2.4 Days</div>
          <p className="text-[11px] text-emerald-700 mt-1 flex items-center font-medium">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>Down from 14.2 days (Pre-AI)</span>
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Deficiency Resolution Rate</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">88.4%</div>
          <p className="text-[11px] text-slate-600 mt-1">
            Resolved within 7 calendar days
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">First-Pass OCR Accuracy</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">94.8%</div>
          <p className="text-[11px] text-slate-600 mt-1">
            High-confidence entity extraction
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Direct Benefit Transfer (DBT)</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">100%</div>
          <p className="text-[11px] text-slate-600 mt-1">
            PFMS-Aadhaar payment success rate
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Application & Verification Trajectory */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Monthly Applications vs Verified Throughput (2026)</span>
            <span className="text-[11px] font-mono text-slate-500">Jul - Oct 2026</span>
          </h3>

          <div className="space-y-4 text-xs">
            {[
              { month: 'July 2026', received: 180, processed: 160 },
              { month: 'August 2026', received: 540, processed: 510 },
              { month: 'September 2026', received: 620, processed: 580 },
              { month: 'October 2026 (Projected)', received: 140, processed: 130 }
            ].map((m, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-slate-700">
                  <span className="font-semibold">{m.month}</span>
                  <span className="font-mono text-slate-600">
                    Received: <strong>{m.received}</strong> | Verified: <strong className="text-emerald-700">{m.processed}</strong>
                  </span>
                </div>
                <div className="flex h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full" 
                    style={{ width: `${(m.received / 700) * 100}%` }}
                    title={`Received: ${m.received}`}
                  ></div>
                  <div 
                    className="bg-emerald-600 h-full -ml-1 border-l border-white" 
                    style={{ width: `${(m.processed / 700) * 100}%` }}
                    title={`Verified: ${m.processed}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 pt-2 text-[11px] text-slate-600">
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-indigo-600"></span>
              <span>Applications Received</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-emerald-600"></span>
              <span>Documents Verified & Cleared</span>
            </span>
          </div>
        </div>

        {/* Chart 2: Scheme Performance & Quota Utilization */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Scheme Quota & Target Utilization</span>
            <span className="text-[11px] font-mono text-slate-500">Cohort 2026-27</span>
          </h3>

          <div className="space-y-5 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-slate-900">National Fellowship for Scheduled Tribes (NFST)</div>
                  <div className="text-[11px] text-slate-500">750 Slots • Indian Universities</div>
                </div>
                <div className="font-mono font-bold text-indigo-900">600 / 750 (80% Sanctioned)</div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-slate-900">National Overseas Scholarship (NOS)</div>
                  <div className="text-[11px] text-slate-500">20 Slots • Top 500 QS World Universities</div>
                </div>
                <div className="font-mono font-bold text-teal-900">20 / 20 (100% Filled)</div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-600 mt-4">
            <span className="font-semibold text-slate-800">Direct Financial Outlay:</span> Total disbursed scholarship assistance across active cohorts stands at <strong className="text-slate-900">₹38.4 Crore</strong>, processed through NPCI-PFMS DBT gateway.
          </div>
        </div>
      </div>
    </div>
  );
};
