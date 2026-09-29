import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Clock, User, Download, FileText, ChevronRight } from 'lucide-react';

export const AuditTrail = () => {
  const { auditLogs } = useApp();

  const handleExportAuditCSV = () => {
    const headers = ['Audit ID', 'Timestamp', 'User & Role', 'Action', 'Application Reference', 'Previous State', 'New State', 'Official Remarks'];
    const rows = auditLogs.map(log => [
      `"${log.id}"`,
      `"${log.timestamp}"`,
      `"${log.user}"`,
      `"${log.action}"`,
      `"${log.appId}"`,
      `"${log.prevStatus}"`,
      `"${log.newStatus}"`,
      `"${log.remarks.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MoTA_Audit_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
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
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase text-slate-700">
              <Shield className="w-4 h-4 text-indigo-700" />
              <span>Statutory Compliance & Governance Ledger</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Immutable Administrative Audit Trail
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cryptographically timestamped chronological ledger of all officer scrutiny decisions, deficiency issuances, policy updates, and sanction orders.
            </p>
          </div>

          <button
            onClick={handleExportAuditCSV}
            className="px-3.5 py-2 rounded bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Audit Log (CSV)</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0f2537] text-white uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Log ID & Time</th>
                <th className="px-4 py-3.5">Authorizing User & Role</th>
                <th className="px-4 py-3.5">Action Executed</th>
                <th className="px-4 py-3.5">Target Record</th>
                <th className="px-4 py-3.5">Status Transition</th>
                <th className="px-4 py-3.5">Justification & Officer Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3 font-mono text-slate-600">
                    <div className="font-bold text-slate-900 text-xs">{log.id}</div>
                    <div className="text-[11px] text-slate-500">{log.timestamp}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{log.user}</div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-block font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                      {log.action}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-mono font-bold text-indigo-950">
                    {log.appId}
                  </td>

                  <td className="px-4 py-3 font-mono text-[11px]">
                    <span className="text-slate-500">{log.prevStatus}</span>
                    <span className="mx-1 text-slate-400">→</span>
                    <span className="font-bold text-indigo-700">{log.newStatus}</span>
                  </td>

                  <td className="px-4 py-3 text-slate-700 max-w-xs leading-relaxed">
                    {log.remarks}
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
