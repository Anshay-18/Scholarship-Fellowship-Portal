import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/ConfirmModal';
import { 
  User, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Building, 
  GraduationCap, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  Send, 
  ChevronRight, 
  ChevronLeft,
  XCircle,
  FileCheck,
  CheckSquare,
  HelpCircle,
  Info
} from 'lucide-react';

export const ApplicationReviewWorkspace = ({ onNavigateToQueue }) => {
  const { 
    applications, 
    selectedAppId, 
    setSelectedAppId, 
    verifyDocument, 
    raiseDeficiency, 
    forwardToScrutiny, 
    rejectApplication,
    schemes
  } = useApp();

  // Find active application
  const app = applications.find(a => a.id === selectedAppId) || applications[0];
  const scheme = schemes.find(s => s.id === app.schemeId) || schemes[0];

  // Left panel active tab: 'profile' | 'documents' | 'history'
  const [leftTab, setLeftTab] = useState('profile');
  const [selectedDocId, setSelectedDocId] = useState(app.documents[0]?.id || 'doc-0101-st');

  // Checklist interactive state
  const [checklist, setChecklist] = useState({
    stCategoryValid: true,
    incomeCeilingValid: app.annualFamilyIncome <= (scheme.rules.incomeCeiling || 99999999),
    marksSatisfied: app.masterPercentage >= scheme.rules.minMasterMarks,
    regularEnrollmentVerified: true,
    nonReceiptDeclared: true
  });

  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'verify_doc' | 'raise_deficiency' | 'forward_scrutiny' | 'reject'

  const activeDoc = app.documents.find(d => d.id === selectedDocId) || app.documents[0];

  // Handle doc selection
  const handleSelectDoc = (docId) => {
    setSelectedDocId(docId);
    setLeftTab('documents');
  };

  // Switch applicant dropdown
  const handleSwitchApplicant = (id) => {
    setSelectedAppId(id);
    const target = applications.find(a => a.id === id);
    if (target && target.documents.length > 0) {
      setSelectedDocId(target.documents[0].id);
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Review Workspace Command Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-mono font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                  Dossier: {app.id}
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-700">{app.schemeName}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                <span>{app.applicantName}</span>
                <span className="text-xs font-normal text-slate-500 font-mono">({app.tribe}, {app.state})</span>
              </h2>
            </div>
          </div>

          {/* Quick switcher & Status indicators */}
          <div className="flex items-center flex-wrap gap-2 self-start lg:self-auto">
            {/* Applicant Selector Dropdown for smooth demo navigation */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Select Dossier:</span>
              <select
                value={app.id}
                onChange={(e) => handleSwitchApplicant(e.target.value)}
                className="py-1.5 px-2.5 rounded border border-slate-300 bg-slate-50 text-slate-800 text-xs font-semibold focus:outline-none focus:border-indigo-600"
              >
                {applications.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.id} - {a.applicantName} ({a.verificationStatus})
                  </option>
                ))}
              </select>
            </div>

            <StatusBadge status={app.stage} type="stage" size="small" />
            <StatusBadge status={app.verificationStatus} type="status" size="small" />
          </div>
        </div>
      </div>

      {/* 2. Split-Screen Review Workspace (Left 6 cols / Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ===================== LEFT PANEL: APPLICANT DOSSIER ===================== */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col min-h-[640px] overflow-hidden">
          {/* Dossier Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
            <button
              onClick={() => setLeftTab('profile')}
              className={`flex items-center space-x-1.5 px-4 py-3 border-b-2 transition ${
                leftTab === 'profile'
                  ? 'border-indigo-700 text-indigo-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Applicant Profile & Form</span>
            </button>

            <button
              onClick={() => setLeftTab('documents')}
              className={`flex items-center space-x-1.5 px-4 py-3 border-b-2 transition ${
                leftTab === 'documents'
                  ? 'border-indigo-700 text-indigo-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Uploaded Documents ({app.documents.length})</span>
            </button>

            <button
              onClick={() => setLeftTab('history')}
              className={`flex items-center space-x-1.5 px-4 py-3 border-b-2 transition ${
                leftTab === 'history'
                  ? 'border-indigo-700 text-indigo-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Processing History</span>
            </button>
          </div>

          {/* Dossier Tab 1: Profile & Form Values */}
          {leftTab === 'profile' && (
            <div className="p-5 space-y-5 overflow-y-auto flex-1 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-2 pb-1 border-b border-slate-100">
                  1. Personal & Tribal Identity Records
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                  <div>
                    <span className="text-slate-500">Applicant Full Name:</span>
                    <div className="font-semibold text-slate-900">{app.applicantName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Father's Name:</span>
                    <div className="font-semibold text-slate-900">{app.fatherName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Date of Birth:</span>
                    <div className="font-mono text-slate-800">{app.dob} ({app.gender})</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Scheduled Tribe (ST):</span>
                    <div className="font-semibold text-indigo-900">{app.tribe} (Notified Community)</div>
                  </div>
                  <div>
                    <span className="text-slate-500">State of Domicile:</span>
                    <div className="font-semibold text-slate-800">{app.state} ({app.district})</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Annual Family Income:</span>
                    <div className="font-mono font-bold text-slate-900">₹{app.annualFamilyIncome.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-2 pb-1 border-b border-slate-100">
                  2. Academic & Research Registration
                </h4>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="col-span-2">
                    <span className="text-slate-500">Higher Education Institution:</span>
                    <div className="font-semibold text-slate-900">{app.institution}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Course / Study Level:</span>
                    <div className="font-semibold text-slate-900">{app.studyLevel} ({app.department})</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Qualifying Exam & Score:</span>
                    <div className="font-semibold text-slate-900">{app.qualifyingExam}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Master's Degree Aggregate:</span>
                    <div className="font-mono font-bold text-indigo-900">{app.masterPercentage}% (ST Min 55%)</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Supervisor / Guide:</span>
                    <div className="font-semibold text-slate-800">{app.supervisor}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Approved Research Topic / Synopsis:</span>
                    <p className="font-medium text-slate-800 italic mt-0.5">{app.researchTopic}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-2 pb-1 border-b border-slate-100">
                  3. Contact & Address Details
                </h4>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed">
                  {app.address} | Phone: <span className="font-mono">{app.phone}</span> | Email: <span className="font-mono">{app.email}</span>
                </p>
              </div>
            </div>
          )}

          {/* Dossier Tab 2: Uploaded Documents & Visual Preview */}
          {leftTab === 'documents' && (
            <div className="p-4 flex flex-col flex-1 overflow-hidden">
              {/* Document Selector Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 mb-3">
                {app.documents.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDocId(d.id)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 transition ${
                      selectedDocId === d.id 
                        ? 'bg-[#1b365d] text-white shadow-sm' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{d.title}</span>
                    {d.status === 'VERIFIED' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    {d.status === 'DEFICIENT' && <AlertTriangle className="w-3 h-3 text-rose-300" />}
                  </button>
                ))}
              </div>

              {/* Document Visual Preview Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex-1 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{activeDoc.title}</div>
                      <div className="text-[11px] font-mono text-slate-500">{activeDoc.fileName} ({activeDoc.fileSize})</div>
                    </div>
                    <StatusBadge status={activeDoc.status} type="status" size="small" />
                  </div>

                  {/* Simulated PDF Viewer Rendering Frame */}
                  <div className="my-4 border border-slate-300 rounded bg-white p-6 shadow-inner text-center space-y-3">
                    <div className="w-12 h-14 bg-red-100 border border-red-200 rounded flex flex-col items-center justify-center text-red-700 mx-auto">
                      <FileText className="w-6 h-6" />
                      <span className="text-[9px] font-bold font-mono uppercase mt-0.5">PDF</span>
                    </div>

                    <div className="max-w-md mx-auto text-xs space-y-1">
                      <p className="font-bold text-slate-900 uppercase">
                        {activeDoc.title} • Government of India Digital Document
                      </p>
                      <p className="text-slate-500 font-mono text-[11px]">
                        Cryptographic Hash: SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1f
                      </p>
                      {activeDoc.status === 'DEFICIENT' && (
                        <div className="mt-2 p-2 bg-rose-50 border border-rose-200 text-rose-800 rounded font-semibold text-[11px]">
                          ⚠ Scrutiny Flag: Certificate scan blurred / Expired FY issue date.
                        </div>
                      )}
                      {activeDoc.status === 'VERIFIED' && (
                        <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded font-semibold text-[11px]">
                          ✓ Verified authentic against repository format.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Authorized Issuing Authority Seal: Sub-Divisional Officer (SDO) / Tehsildar</span>
                  <button
                    onClick={() => setActiveModal('verify_doc')}
                    disabled={activeDoc.status === 'VERIFIED'}
                    className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{activeDoc.status === 'VERIFIED' ? 'Document Verified' : 'Mark Document Verified'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dossier Tab 3: Processing History */}
          {leftTab === 'history' && (
            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-2 pb-1 border-b border-slate-100">
                Chronological Processing Log
              </h4>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {app.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full border border-white bg-indigo-700"></div>
                    <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
                      <span>{event.timestamp}</span>
                      <span className="bg-slate-100 px-1.5 py-0.2 rounded font-sans text-slate-700">{event.actor}</span>
                    </div>
                    <div className="font-bold text-slate-900 mt-0.5">{event.stage}</div>
                    <p className="text-slate-600 mt-0.5">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===================== RIGHT PANEL: AI EXTRACTION & OFFICER CONTROLS ===================== */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* Section 1: AI Document Intelligence OCR Results */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 mb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  AI Document Extraction & Advisory Cross-Check
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded font-semibold">
                Advisory Insights
              </span>
            </div>

            {/* AI Flags Alert (if any) */}
            {app.aiFlags && app.aiFlags.length > 0 && (
              <div className="mb-3 p-3 bg-rose-50 border border-rose-200 rounded text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-rose-900 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Advisory Risk Detected: {app.aiFlags[0].field}</span>
                </div>
                <p className="text-rose-800 text-[11px] leading-relaxed">{app.aiFlags[0].message}</p>
                <div className="text-[11px] text-rose-900 bg-white/70 p-1.5 rounded mt-1 font-medium">
                  Recommendation: {app.aiFlags[0].advisory}
                </div>
              </div>
            )}

            {/* Side-by-Side Comparison: Application Form vs OCR Extracted */}
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-3 font-bold text-slate-500 uppercase text-[10px] pb-1 border-b border-slate-100">
                <span>Field Name</span>
                <span>Submitted in Form</span>
                <span>OCR Extracted Value</span>
              </div>

              <div className="grid grid-cols-3 py-1.5 border-b border-slate-50 items-center">
                <span className="font-semibold text-slate-700">Candidate Name:</span>
                <span className="text-slate-900 font-medium">{app.applicantName}</span>
                <span className="text-emerald-800 font-mono font-medium flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                  {app.applicantName}
                </span>
              </div>

              <div className="grid grid-cols-3 py-1.5 border-b border-slate-50 items-center">
                <span className="font-semibold text-slate-700">ST Community:</span>
                <span className="text-slate-900 font-medium">{app.tribe}</span>
                <span className="text-emerald-800 font-mono font-medium flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                  {app.tribe} (Notified)
                </span>
              </div>

              <div className="grid grid-cols-3 py-1.5 border-b border-slate-50 items-center">
                <span className="font-semibold text-slate-700">Family Income:</span>
                <span className="text-slate-900 font-medium">₹{app.annualFamilyIncome.toLocaleString('en-IN')}</span>
                <span className={`font-mono font-medium flex items-center ${
                  app.verificationStatus === 'DEFICIENCY_RAISED' ? 'text-rose-700' : 'text-emerald-800'
                }`}>
                  {app.verificationStatus === 'DEFICIENCY_RAISED' ? (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" />
                      ₹1,80,000 (Expired Date)
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                      ₹{app.annualFamilyIncome.toLocaleString('en-IN')} (Verified)
                    </>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-3 py-1.5 items-center">
                <span className="font-semibold text-slate-700">Post-Grad %:</span>
                <span className="text-slate-900 font-medium">{app.masterPercentage}%</span>
                <span className="text-emerald-800 font-mono font-medium flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                  {app.masterPercentage}% (Compliant)
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Statutory Eligibility Checklist */}
          <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Statutory Scheme Eligibility Checklist</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500">Officer Verification Required</span>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center space-x-2.5 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.stCategoryValid}
                  onChange={(e) => setChecklist({ ...checklist, stCategoryValid: e.target.checked })}
                  className="rounded text-indigo-700 focus:ring-indigo-600"
                />
                <span className="text-slate-800 font-medium">
                  Valid Scheduled Tribe Certificate issued by SDO / DM Competent Authority
                </span>
              </label>

              <label className="flex items-center space-x-2.5 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.incomeCeilingValid}
                  onChange={(e) => setChecklist({ ...checklist, incomeCeilingValid: e.target.checked })}
                  className="rounded text-indigo-700 focus:ring-indigo-600"
                />
                <span className="text-slate-800 font-medium">
                  Annual gross family income within prescribed statutory ceiling ({scheme.rules.incomeCeiling === 0 ? 'No ceiling under NFST' : `₹${scheme.rules.incomeCeiling.toLocaleString('en-IN')}`})
                </span>
              </label>

              <label className="flex items-center space-x-2.5 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.marksSatisfied}
                  onChange={(e) => setChecklist({ ...checklist, marksSatisfied: e.target.checked })}
                  className="rounded text-indigo-700 focus:ring-indigo-600"
                />
                <span className="text-slate-800 font-medium">
                  Qualifying Master’s percentage &ge; {scheme.rules.minMasterMarks}% aggregate
                </span>
              </label>

              <label className="flex items-center space-x-2.5 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.regularEnrollmentVerified}
                  onChange={(e) => setChecklist({ ...checklist, regularEnrollmentVerified: e.target.checked })}
                  className="rounded text-indigo-700 focus:ring-indigo-600"
                />
                <span className="text-slate-800 font-medium">
                  Confirmed full-time regular admission in recognized University
                </span>
              </label>
            </div>
          </div>

          {/* Section 3: Officer Decision Action Controls (The Demonstration Centerpiece) */}
          <div className="bg-slate-900 text-white rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Officer Scrutiny Determination
                </h3>
                <p className="text-[11px] text-slate-300">
                  Desk 3 Scrutiny Officer: <strong className="text-white">Dr. Arvind Soren</strong>
                </p>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                Human-in-the-Loop Sign-off
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Action 1: Mark Document Verified */}
              <button
                onClick={() => setActiveModal('verify_doc')}
                className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition text-left"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Mark Document Verified</span>
              </button>

              {/* Action 2: Raise Deficiency */}
              <button
                onClick={() => setActiveModal('raise_deficiency')}
                className="p-2.5 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition text-left"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>Raise Formal Deficiency</span>
              </button>

              {/* Action 3: Forward for Scrutiny */}
              <button
                onClick={() => setActiveModal('forward_scrutiny')}
                className="col-span-2 p-2.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md transition"
              >
                <Send className="w-4 h-4" />
                <span>Approve Eligibility & Forward to Scrutiny Committee</span>
              </button>

              {/* Action 4: Reject Application */}
              <button
                onClick={() => setActiveModal('reject')}
                className="col-span-2 p-2 rounded bg-slate-800/60 hover:bg-rose-950 text-slate-400 hover:text-rose-300 text-[11px] font-medium transition text-center border border-slate-800"
              >
                Reject Application with Statutory Grounds
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals for Mandatory Remarks & Accountability */}
      {/* 1. Verify Document Modal */}
      <ConfirmModal
        isOpen={activeModal === 'verify_doc'}
        onClose={() => setActiveModal(null)}
        onConfirm={(remark) => {
          verifyDocument(app.id, activeDoc.id, remark);
          setActiveModal(null);
        }}
        title={`Verify Credential: ${activeDoc.title}`}
        message={`Confirm that you have scrutinized "${activeDoc.fileName}" and verified authenticity against designated state revenue / university standards.`}
        confirmText="Confirm Verification"
        requireRemarks={false}
        remarksPlaceholder="e.g. SDO seal and QR code cross-verified with e-District repository."
      />

      {/* 2. Raise Deficiency Modal */}
      <ConfirmModal
        isOpen={activeModal === 'raise_deficiency'}
        onClose={() => setActiveModal(null)}
        onConfirm={(remark) => {
          raiseDeficiency(app.id, {
            category: 'DOCUMENT_DEFECT',
            documentType: activeDoc.type,
            officerNote: remark,
            deadline: '2026-10-15'
          });
          setActiveModal(null);
          if (onNavigateToQueue) onNavigateToQueue();
        }}
        title="Issue Formal Deficiency Notice"
        message="Raising a deficiency pauses application progress and sends an official notification to the applicant requiring submission of a rectified certificate."
        confirmText="Issue Deficiency Notice"
        isDestructive={true}
        requireRemarks={true}
        presetReasons={[
          'Revenue Officer seal/stamp blurred and illegible (< 200 DPI scan)',
          'Income certificate issued in previous Financial Year; current FY 2025-26 certificate required',
          'Name expansion discrepancy between application form and Scheduled Tribe certificate',
          'Unconditional foreign admission offer letter required (conditional letter uploaded)',
          'Matriculation certificate or age proof missing clear date of birth'
        ]}
        remarksPlaceholder="Specify exact defect and instructions for candidate..."
      />

      {/* 3. Forward to Scrutiny Modal */}
      <ConfirmModal
        isOpen={activeModal === 'forward_scrutiny'}
        onClose={() => setActiveModal(null)}
        onConfirm={(remark) => {
          forwardToScrutiny(app.id, remark);
          setActiveModal(null);
        }}
        title="Approve Eligibility & Forward to Scrutiny Committee"
        message={`Confirm that all mandatory credentials for ${app.applicantName} have been verified and comply with ${scheme.name} guidelines. Application will advance to the Central Selection Committee.`}
        confirmText="Approve & Forward to Committee"
        requireRemarks={false}
        remarksPlaceholder="e.g. Cleared all 5 statutory checklist items. Recommended for merit listing."
      />

      {/* 4. Reject Modal */}
      <ConfirmModal
        isOpen={activeModal === 'reject'}
        onClose={() => setActiveModal(null)}
        onConfirm={(remark) => {
          rejectApplication(app.id, remark);
          setActiveModal(null);
        }}
        title="Reject Application"
        message="This is a final administrative decision to reject this fellowship application. A statutory rejection reason must be recorded."
        confirmText="Confirm Rejection"
        isDestructive={true}
        requireRemarks={true}
        presetReasons={[
          'Applicant does not belong to a notified Scheduled Tribe community in the state of domicile',
          'Gross family income exceeds the statutory scheme ceiling',
          'Qualifying Master’s percentage is below the mandatory 55% threshold for ST candidates',
          'Candidate in concurrent receipt of another Central Government fellowship'
        ]}
      />
    </div>
  );
};
