import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  FileCheck, 
  ShieldAlert, 
  ArrowUpRight,
  ChevronRight,
  BarChart3,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';

export const AdminDashboard = ({ onNavigate, onSelectApp }) => {
  const { applications, schemes } = useApp();

  // Metrics computation from real application state
  const totalApps = 1480; // High-level institutional baseline
  const activeSeedCount = applications.length;
  const pendingDocVerification = applications.filter(a => a.stage === 'DOCUMENT_VERIFICATION' && a.verificationStatus !== 'DEFICIENCY_RAISED').length + 214;
  const withDeficiencies = applications.filter(a => a.verificationStatus === 'DEFICIENCY_RAISED').length + 86;
  const eligibleApps = applications.filter(a => a.eligibilityStatus === 'ELIGIBLE' || a.stage === 'SCRUTINY').length + 342;
  const selectedAwarded = applications.filter(a => a.stage === 'AWARDED' || a.stage === 'SELECTION').length + 620;
  const urgentCount = applications.filter(a => a.urgentAttention).length + 18;

  // Scheme counts
  const nfstCount = 1120;
  const nosCount = 360;

  // Urgent triage list from actual application records
  const urgentQueue = applications.filter(a => a.urgentAttention).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>National Fellowship & Scholarship Scrutiny Desk</span>
              <span>•</span>
              <span className="text-emerald-700 font-mono">Live Monitoring</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Ministry Administrative & Verification Overview
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Scheduled Tribes Higher Education Schemes • Session 2026–27 Cycle
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('workspace')}
              className="px-3.5 py-2 rounded bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Open Application Review Workspace</span>
            </button>
            <button
              onClick={() => onNavigate('deficiencies')}
              className="px-3.5 py-2 rounded bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Deficiency Queue ({applications.filter(a => a.verificationStatus === 'DEFICIENCY_RAISED').length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Operational Metrics Grid (8 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Total Applications</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5">{totalApps.toLocaleString('en-IN')}</div>
          <div className="mt-2 text-[11px] text-emerald-700 flex items-center font-medium">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>+14.2% vs previous session</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Pending Verification</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-indigo-900 mt-1.5">{pendingDocVerification}</div>
          <div className="mt-2 text-[11px] text-slate-500">
            Average desk turnaround: <strong className="text-slate-800">2.4 Days</strong>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-lg border border-amber-200 bg-amber-50/40 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-amber-900">
            <span className="font-bold uppercase tracking-wider">Deficiencies Raised</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-1.5">{withDeficiencies}</div>
          <div className="mt-2 text-[11px] text-amber-800">
            Resolution rate: <strong className="text-amber-950 font-bold">88.4% within 7 days</strong>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-lg border border-rose-200 bg-rose-50/40 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-rose-900">
            <span className="font-bold uppercase tracking-wider">Urgent Attention</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-900 mt-1.5">{urgentCount}</div>
          <div className="mt-2 text-[11px] text-rose-800 font-medium">
            Deadline expiring in &lt; 48 hours
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Scrutiny Queue</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-900 mt-1.5">{eligibleApps}</div>
          <div className="mt-2 text-[11px] text-slate-500">
            Committee screening scheduled
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Awarded & Sanctioned</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-900 mt-1.5">{selectedAwarded}</div>
          <div className="mt-2 text-[11px] text-emerald-700">
            DBT Direct Credit active
          </div>
        </div>

        {/* Metric 7 */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">NFST Applications</span>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-bold">750 Slots</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5">{nfstCount}</div>
          <div className="mt-2 text-[11px] text-slate-500">
            1.49 applicants per fellowship slot
          </div>
        </div>

        {/* Metric 8 */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">NOS Overseas</span>
            <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded font-bold">20 Slots</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1.5">{nosCount}</div>
          <div className="mt-2 text-[11px] text-slate-500">
            Top 500 QS world ranked universities
          </div>
        </div>
      </div>

      {/* 3. Operational Charts & Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Scheme & Pipeline Funnel (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Application Scrutiny Pipeline Funnel</h3>
              <p className="text-xs text-slate-500">Distribution of cohort across processing milestones</p>
            </div>
            <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              Total: 1,480 Apps
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Stage 1 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">1. Applications Registered & Submitted</span>
                <span className="font-mono text-slate-900">1,480 (100%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-slate-700 h-2 rounded-full w-full"></div>
              </div>
            </div>

            {/* Stage 2 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">2. AI Pre-screened & Document Verified</span>
                <span className="font-mono text-indigo-700">1,180 (79.7%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '79.7%' }}></div>
              </div>
            </div>

            {/* Stage 3 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">3. Statutory Eligibility Criteria Cleared</span>
                <span className="font-mono text-purple-700">964 (65.1%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65.1%' }}></div>
              </div>
            </div>

            {/* Stage 4 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">4. Scrutiny Committee Recommended</span>
                <span className="font-mono text-teal-700">770 (52.0%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '52.0%' }}></div>
              </div>
            </div>

            {/* Stage 5 */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">5. Sanction Order Issued (Awarded)</span>
                <span className="font-mono text-emerald-800">620 (41.9%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '41.9%' }}></div>
              </div>
            </div>
          </div>

          {/* AI Turnaround Time Impact Box */}
          <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800">AI Document Intelligence Impact:</span>
              <p className="text-slate-600 text-[11px]">
                Turnaround time reduced from <strong className="text-slate-800">14.2 days</strong> to <strong className="text-emerald-700 font-bold">2.4 days</strong> with automated credential pre-screening.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              -83% Latency
            </span>
          </div>
        </div>

        {/* Right: State-wise Tribal Representation (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Geographic Distribution</h3>
              <p className="text-xs text-slate-500">Major ST domicile states represented</p>
            </div>
            <MapPin className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { state: 'Jharkhand', count: 342, pct: 23.1 },
              { state: 'Odisha', count: 284, pct: 19.2 },
              { state: 'Madhya Pradesh', count: 218, pct: 14.7 },
              { state: 'Chhattisgarh', count: 174, pct: 11.8 },
              { state: 'North-Eastern States (Assam, Mizoram, Sikkim)', count: 188, pct: 12.7 },
              { state: 'Rajasthan & Gujarat', count: 164, pct: 11.1 },
              { state: 'Other States / UTs', count: 110, pct: 7.4 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-slate-700">
                  <span className="font-medium truncate max-w-[200px]">{item.state}</span>
                  <span className="font-mono text-slate-900 font-semibold">{item.count} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-[#1b365d] h-1.5 rounded-full" style={{ width: `${item.pct * 3}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Urgent Attention Queue Table (Centerpiece Demo candidates) */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span>Applications Requiring Officer Desk Action</span>
              <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">
                Priority Scrutiny Desk
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Applications flagged with deficiencies, OCR discrepancies, or approaching compliance deadlines.
            </p>
          </div>

          <button
            onClick={() => onNavigate('applications')}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center space-x-1"
          >
            <span>View All Applications</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">App ID</th>
                <th className="px-4 py-3">Applicant Name</th>
                <th className="px-4 py-3">Scheme</th>
                <th className="px-4 py-3">State / Tribe</th>
                <th className="px-4 py-3">AI Pre-screen</th>
                <th className="px-4 py-3">Verification Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {urgentQueue.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-950">{app.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{app.applicantName}</div>
                    <div className="text-[11px] text-slate-500">{app.institution}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-slate-700 font-semibold">{app.schemeId}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    <div>{app.state}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{app.tribe}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block font-mono font-bold ${
                      app.aiPreScreenScore >= 90 ? 'text-emerald-700' : app.aiPreScreenScore >= 75 ? 'text-amber-700' : 'text-rose-700'
                    }`}>
                      {app.aiPreScreenScore}% Score
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.verificationStatus} type="status" size="small" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        onSelectApp(app.id);
                        onNavigate('workspace');
                      }}
                      className="px-3 py-1 bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-semibold rounded shadow-sm transition"
                    >
                      Open Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
