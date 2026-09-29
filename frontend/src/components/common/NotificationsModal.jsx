import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, X, AlertTriangle, CheckCircle, Clock, FileText, ArrowRight } from 'lucide-react';

export const NotificationsModal = ({ isOpen, onClose, onNavigate }) => {
  const { currentRole, applications, selectedAppId, setSelectedAppId } = useApp();

  if (!isOpen) return null;

  // Generate role-specific notifications
  const studentApp = applications.find(a => a.id === 'MOTA-2026-NFST-0101') || applications[0];

  const studentNotifications = [
    {
      id: 'notif-1',
      title: 'Action Required: Deficiency Notice Issued',
      message: 'Desk 3 has issued a formal deficiency notice regarding your uploaded Income Certificate. Fresh certificate for FY 2025-26 required by Oct 05, 2026.',
      timestamp: '2 hours ago',
      type: 'DEFICIENCY',
      read: false,
      appId: studentApp.id,
      actionTab: 'track'
    },
    {
      id: 'notif-2',
      title: 'Document Pre-screening Completed',
      message: 'AI Extraction Engine completed advisory checks on 5 uploaded files. 4 verified, 1 flagged for revenue stamp clarity.',
      timestamp: 'Sep 12, 2026',
      type: 'INFO',
      read: true,
      appId: studentApp.id,
      actionTab: 'track'
    },
    {
      id: 'notif-3',
      title: 'Application Successfully Registered',
      message: `Your application ${studentApp.id} for National Fellowship for ST (NFST) has been registered in the Ministry repository.`,
      timestamp: 'Sep 12, 2026',
      type: 'SUCCESS',
      read: true,
      appId: studentApp.id,
      actionTab: 'dashboard'
    }
  ];

  const officerNotifications = applications
    .filter(a => a.urgentAttention || a.verificationStatus === 'DEFICIENCY_RAISED' || a.verificationStatus === 'DEFICIENCY_RESOLVED')
    .slice(0, 6)
    .map((a, idx) => ({
      id: `off-notif-${idx}`,
      title: a.verificationStatus === 'DEFICIENCY_RESOLVED' 
        ? `Clarification Resubmitted: ${a.applicantName}` 
        : (a.verificationStatus === 'DEFICIENCY_RAISED' ? `Active Deficiency: ${a.applicantName}` : `Urgent Scrutiny: ${a.applicantName}`),
      message: `Application ${a.id} (${a.schemeId}) - ${a.state}. Status: ${a.verificationStatus}.`,
      timestamp: a.submissionDate,
      type: a.verificationStatus === 'DEFICIENCY_RAISED' ? 'DEFICIENCY' : 'INFO',
      read: false,
      appId: a.id,
      actionTab: 'workspace'
    }));

  const activeList = currentRole === 'student' ? studentNotifications : officerNotifications;

  const handleAction = (item) => {
    setSelectedAppId(item.appId);
    if (onNavigate) {
      onNavigate(item.actionTab);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0f2537] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Bell className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="text-base font-bold">Portal Communications & Official Alerts</h2>
              <p className="text-xs text-slate-300">
                {currentRole === 'student' ? 'Applicant Notification Center' : 'Desk Scrutiny Alerts & Queue Reminders'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 flex-1">
          {activeList.map((item) => (
            <div 
              key={item.id} 
              className={`py-3 px-3 rounded-md transition ${!item.read ? 'bg-amber-50/50 border border-amber-200/60' : 'hover:bg-slate-50'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start space-x-2.5">
                  {item.type === 'DEFICIENCY' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  ) : item.type === 'SUCCESS' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.message}</p>
                    <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-500 font-mono">
                      <span>{item.timestamp}</span>
                      <span>•</span>
                      <span>Ref: {item.appId}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAction(item)}
                  className="px-2.5 py-1 text-xs font-medium rounded bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center space-x-1 flex-shrink-0 mt-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>All communications are logged with timestamped delivery receipts</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
