import React from 'react';

export const StatusBadge = ({ status, type = 'status', size = 'normal' }) => {
  const sizeClasses = size === 'small' 
    ? 'text-xs px-2 py-0.5' 
    : 'text-xs md:text-sm px-2.5 py-1 font-medium';

  // Map application stages
  if (type === 'stage') {
    switch (status) {
      case 'DRAFT':
        return <span className={`inline-flex items-center rounded border border-slate-300 bg-slate-100 text-slate-700 ${sizeClasses}`}>Draft</span>;
      case 'SUBMITTED':
        return <span className={`inline-flex items-center rounded border border-blue-200 bg-blue-50 text-blue-800 ${sizeClasses}`}>Submitted</span>;
      case 'DOCUMENT_VERIFICATION':
        return <span className={`inline-flex items-center rounded border border-indigo-200 bg-indigo-50 text-indigo-800 ${sizeClasses}`}>Document Verification</span>;
      case 'ELIGIBILITY_REVIEW':
        return <span className={`inline-flex items-center rounded border border-purple-200 bg-purple-50 text-purple-800 ${sizeClasses}`}>Eligibility Review</span>;
      case 'SCRUTINY':
        return <span className={`inline-flex items-center rounded border border-amber-300 bg-amber-50 text-amber-900 ${sizeClasses}`}>Under Scrutiny</span>;
      case 'SELECTION':
        return <span className={`inline-flex items-center rounded border border-teal-300 bg-teal-50 text-teal-900 ${sizeClasses}`}>Recommended for Selection</span>;
      case 'AWARDED':
        return <span className={`inline-flex items-center rounded border border-emerald-300 bg-emerald-50 text-emerald-900 ${sizeClasses}`}>Awarded / Sanctioned</span>;
      case 'REJECTED':
        return <span className={`inline-flex items-center rounded border border-rose-300 bg-rose-50 text-rose-800 ${sizeClasses}`}>Rejected</span>;
      default:
        return <span className={`inline-flex items-center rounded border border-slate-300 bg-slate-100 text-slate-700 ${sizeClasses}`}>{status}</span>;
    }
  }

  // Map verification statuses
  switch (status) {
    case 'PENDING':
      return (
        <span className={`inline-flex items-center rounded border border-slate-300 bg-slate-50 text-slate-700 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
          Pending Verification
        </span>
      );
    case 'AI_FLAGGED':
      return (
        <span className={`inline-flex items-center rounded border border-amber-300 bg-amber-50 text-amber-900 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
          AI Advisory Flag
        </span>
      );
    case 'DEFICIENCY_RAISED':
      return (
        <span className={`inline-flex items-center rounded border border-rose-300 bg-rose-50 text-rose-900 font-semibold ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1.5"></span>
          Deficiency Notice Raised
        </span>
      );
    case 'DEFICIENCY_RESOLVED':
      return (
        <span className={`inline-flex items-center rounded border border-blue-300 bg-blue-50 text-blue-900 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5"></span>
          Clarification Submitted
        </span>
      );
    case 'VERIFIED':
      return (
        <span className={`inline-flex items-center rounded border border-emerald-300 bg-emerald-50 text-emerald-900 font-medium ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span>
          Document Verified
        </span>
      );
    case 'ELIGIBLE':
      return (
        <span className={`inline-flex items-center rounded border border-emerald-300 bg-emerald-50 text-emerald-900 font-medium ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span>
          Eligible
        </span>
      );
    case 'UNDER_REVIEW':
      return (
        <span className={`inline-flex items-center rounded border border-amber-300 bg-amber-50 text-amber-900 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
          Under Review
        </span>
      );
    case 'DEFICIENT':
      return (
        <span className={`inline-flex items-center rounded border border-rose-300 bg-rose-50 text-rose-900 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1.5"></span>
          Deficient / Re-upload Required
        </span>
      );
    default:
      return <span className={`inline-flex items-center rounded border border-slate-300 bg-slate-100 text-slate-700 ${sizeClasses}`}>{status}</span>;
  }
};
