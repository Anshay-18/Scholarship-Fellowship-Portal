import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { SAMPLE_OCR_PRESETS } from '../../data/mockData';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Upload, 
  Send, 
  ShieldCheck, 
  FileCheck, 
  FileWarning, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

export const ApplicationTracker = ({ onNavigateToFellowship }) => {
  const { applications, resolveDeficiency } = useApp();

  // Primary demo application for Rajeshwari Marandi
  const myApp = applications.find(a => a.id === 'MOTA-2026-NFST-0101') || applications[0];

  // Resolution state
  const [applicantResponseText, setApplicantResponseText] = useState(
    'Uploaded fresh Income Certificate for FY 2025-26 issued by Tahsildar & Executive Magistrate, Ranchi (Cert No: JH/RNC/INC/2026/049182) with valid digital QR code and revenue seal.'
  );
  const [selectedFilePreset, setSelectedFilePreset] = useState(SAMPLE_OCR_PRESETS[3]); // Corrected FY 25-26 preset
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleResolveSubmit = (e) => {
    e.preventDefault();
    if (!applicantResponseText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      resolveDeficiency(myApp.id, {
        applicantResponse: applicantResponseText,
        newDocFileName: selectedFilePreset.file,
        extractedData: selectedFilePreset.extracted
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-semibold uppercase text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Application Ref: {myApp.id}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500">{myApp.schemeId} Scheme</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Scrutiny Lifecycle & Document Tracking
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Assigned Desk: <strong className="text-slate-800">{myApp.assignedDesk}</strong> | Scrutiny Officer: <strong className="text-slate-800">{myApp.assignedOfficer}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <StatusBadge status={myApp.stage} type="stage" />
            <StatusBadge status={myApp.verificationStatus} type="status" />
          </div>
        </div>
      </div>

      {/* 2. Interactive Deficiency Response Panel (The Core Demonstration Step) */}
      {myApp.deficiency && myApp.deficiency.hasDeficiency && !myApp.deficiency.resolved && (
        <div className="bg-white rounded-lg border-2 border-rose-300 shadow-sm overflow-hidden">
          <div className="bg-rose-50 px-5 py-4 border-b border-rose-200 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-rose-950">
                  Official Deficiency Notice Received: {myApp.deficiency.noticeId}
                </h3>
                <p className="text-xs text-rose-800">
                  Issued by {myApp.deficiency.raisedBy} on {myApp.deficiency.dateRaised}. Strict Response Deadline: <strong className="underline">{myApp.deficiency.deadline}</strong>
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-rose-200 text-rose-900 px-2.5 py-1 rounded">
              Action Mandatory
            </span>
          </div>

          <div className="p-5 space-y-4">
            {/* Officer Observation Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wide block mb-1">
                Official Scrutiny Observation & Reason:
              </span>
              <p className="text-slate-700 italic leading-relaxed">
                "{myApp.deficiency.officerNote}"
              </p>
              <div className="mt-2 text-[11px] text-slate-500 flex items-center space-x-2">
                <span>Affected Credential:</span>
                <span className="font-semibold text-rose-700 uppercase">{myApp.deficiency.documentType.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Applicant Correction Form */}
            <form onSubmit={handleResolveSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  1. Select Rectified Document to Upload:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div 
                    onClick={() => setSelectedFilePreset(SAMPLE_OCR_PRESETS[3])}
                    className={`p-3 rounded border text-xs cursor-pointer transition ${
                      selectedFilePreset.id === 'sample-corrected-income'
                        ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">Fresh FY 2025-26 Tehsildar Certificate</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">File: {SAMPLE_OCR_PRESETS[3].file} (High-Res 350 DPI)</p>
                    <span className="inline-block mt-2 text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                      ✓ Validated with Digital e-District QR
                    </span>
                  </div>

                  <div 
                    onClick={() => setSelectedFilePreset(SAMPLE_OCR_PRESETS[0])}
                    className={`p-3 rounded border text-xs cursor-pointer transition ${
                      selectedFilePreset.id === 'sample-clean-st'
                        ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">SDO Certified Revenue Copy</span>
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">File: Income_Certificate_Certified_SDO.pdf</p>
                    <span className="inline-block mt-2 text-[10px] font-mono bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-semibold">
                      Attested Gazette Officer Copy
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  2. Applicant Explanation / Written Response <span className="text-rose-600">*</span>:
                </label>
                <textarea
                  value={applicantResponseText}
                  onChange={(e) => setApplicantResponseText(e.target.value)}
                  rows={3}
                  className="w-full text-xs border border-slate-300 rounded p-2.5 text-slate-900 focus:outline-none focus:border-indigo-600 leading-relaxed"
                  placeholder="Provide clarification regarding the newly uploaded certificate..."
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-500">
                  Resubmission directly notifies <strong className="text-slate-800">{myApp.assignedOfficer}</strong> on Desk 3.
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold rounded flex items-center space-x-1.5 shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Resubmitting to Desk...' : 'Resubmit Rectified Document'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Resolved State Alert */}
      {myApp.deficiency && myApp.deficiency.resolved && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 text-xs text-emerald-950 flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-emerald-900">
              Deficiency Response Submitted & Under Re-Verification
            </h4>
            <p className="text-emerald-800 mt-0.5 leading-relaxed">
              Your response and corrected document (<span className="font-mono font-medium">{myApp.deficiency.resubmittedDoc}</span>) were successfully delivered to the Scrutiny Desk on {myApp.deficiency.resolvedDate}. The officer will re-evaluate and update your verification status shortly.
            </p>
            <div className="mt-2 text-[11px] font-mono text-emerald-900 bg-white/70 p-2 rounded border border-emerald-200">
              Applicant Note: "{myApp.deficiency.applicantResponse}"
            </div>
          </div>
        </div>
      )}

      {/* 4. Split Layout: Document Status Checklist (Left) & Detailed Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Uploaded Documents Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Uploaded Credentials ({myApp.documents.length})
              </h3>
              <span className="text-[11px] text-slate-500">DigiLocker / Direct Upload</span>
            </div>

            <div className="space-y-2.5">
              {myApp.documents.map((doc) => (
                <div key={doc.id} className="p-3 rounded border border-slate-200 bg-slate-50/50 text-xs flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-900">{doc.title}</div>
                        <div className="text-[11px] font-mono text-slate-500 truncate max-w-[180px]">{doc.fileName}</div>
                      </div>
                    </div>
                    <StatusBadge status={doc.status} type="status" size="small" />
                  </div>

                  {doc.officerRemark && (
                    <div className="mt-2 text-[11px] bg-white p-1.5 rounded border border-slate-200 text-slate-600 italic">
                      Desk Remark: "{doc.officerRemark}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Detailed Chronological Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Official Processing History & Audit Trail
              </h3>
              <span className="text-[11px] font-mono text-slate-500">Live Timestamp Log</span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {myApp.timeline.map((event, idx) => (
                <div key={event.id || idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white bg-indigo-600 shadow-sm"></div>

                  <div className="text-xs">
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span className="font-mono">{event.timestamp}</span>
                      <span className="font-medium text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded">{event.actor}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mt-1">{event.stage}</h4>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
