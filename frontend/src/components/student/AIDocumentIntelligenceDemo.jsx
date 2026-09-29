import React, { useState } from 'react';
import { SAMPLE_OCR_PRESETS } from '../../data/mockData';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Sparkles, 
  Scan, 
  Cpu, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  Edit3, 
  Info, 
  FileCheck2,
  FileQuestion,
  FileWarning
} from 'lucide-react';

export const AIDocumentIntelligenceDemo = ({ onVerificationDone, initialPresetId = 'sample-expired-income' }) => {
  const [selectedPreset, setSelectedPreset] = useState(
    SAMPLE_OCR_PRESETS.find(p => p.id === initialPresetId) || SAMPLE_OCR_PRESETS[2]
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0); // 0: Idle, 1: Pre-processing & OCR, 2: NLP Entity Mapping, 3: Rule Cross-Check, 4: Done
  const [extractedData, setExtractedData] = useState(selectedPreset.extracted);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({ ...selectedPreset.extracted });
  const [hasRunScan, setHasRunScan] = useState(true);

  // Switch preset
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setExtractedData(preset.extracted);
    setEditedFields(preset.extracted);
    setIsEditing(false);
    triggerScan(preset);
  };

  // Simulated progressive OCR pipeline
  const triggerScan = (presetToScan = selectedPreset) => {
    setIsProcessing(true);
    setProcessingStep(1);

    setTimeout(() => {
      setProcessingStep(2);
      setTimeout(() => {
        setProcessingStep(3);
        setTimeout(() => {
          setProcessingStep(4);
          setIsProcessing(false);
          setHasRunScan(true);
          if (onVerificationDone) {
            onVerificationDone(presetToScan);
          }
        }, 500);
      }, 500);
    }, 600);
  };

  // Handle manual correction save
  const handleSaveCorrection = () => {
    setExtractedData({ ...editedFields });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#0f2537] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-semibold flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Document Intelligence Module
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-slate-300">Simulated OCR & Pre-screening</span>
          </div>
          <h3 className="text-base font-bold text-white mt-1">
            Intelligent Document Verification & Extraction Engine
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Advisory pre-screening for ST caste certificates, income records, and academic credentials.
          </p>
        </div>

        <button
          onClick={() => triggerScan()}
          disabled={isProcessing}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>{isProcessing ? 'Analyzing Document...' : 'Re-run OCR Scan'}</span>
        </button>
      </div>

      {/* Mandatory Government Prototype Disclaimer */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 text-[11px] text-slate-600 flex items-start space-x-2">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-800">Transparency Notice:</strong> Simulated OCR extraction and automated rule evaluation are provided solely as advisory pre-screening for applicant convenience. Actual legal validity is verified strictly by designated Ministry Scrutiny Officers.
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-5 space-y-6">
        {/* Preset Document Selector for Demonstration */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Select Test Document Preset (Judge Demonstration Scenarios):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SAMPLE_OCR_PRESETS.map((preset) => {
              const isSelected = selectedPreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                    isSelected 
                      ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase font-semibold text-slate-500">
                        {preset.type.replace('_', ' ')}
                      </span>
                      {preset.status === 'COMPLETE' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Valid"></span>
                      )}
                      {preset.status === 'MISMATCH' && (
                        <span className="w-2 h-2 rounded-full bg-amber-500" title="Mismatch"></span>
                      )}
                      {preset.status === 'DEFICIENT' && (
                        <span className="w-2 h-2 rounded-full bg-rose-500" title="Deficient"></span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-900 line-clamp-1">{preset.name}</div>
                    <div className="text-[11px] font-mono text-slate-500 mt-1 truncate">{preset.file}</div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Confidence:</span>
                    <span className={`font-mono font-bold ${
                      preset.confidence >= 90 ? 'text-emerald-700' : preset.confidence >= 70 ? 'text-amber-700' : 'text-rose-700'
                    }`}>
                      {preset.confidence}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* OCR Scan Progress Pipeline (When running) */}
        {isProcessing && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-indigo-700 animate-pulse" />
                <span>AI Document Intelligence Processing in Progress...</span>
              </span>
              <span className="font-mono text-indigo-700">Stage {processingStep} of 3</span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(processingStep / 3) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 pt-1">
              <div className={`flex items-center space-x-1 ${processingStep >= 1 ? 'text-indigo-900 font-semibold' : 'text-slate-400'}`}>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>1. Resolution & OCR Scan</span>
              </div>
              <div className={`flex items-center space-x-1 ${processingStep >= 2 ? 'text-indigo-900 font-semibold' : 'text-slate-400'}`}>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>2. NLP Field Extraction</span>
              </div>
              <div className={`flex items-center space-x-1 ${processingStep >= 3 ? 'text-indigo-900 font-semibold' : 'text-slate-400'}`}>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>3. Consistency Cross-check</span>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Split: Document Quality & Extracted Fields Review */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Document File Card & Quality Checks (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Visual Document Card */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-14 bg-red-100 border border-red-200 rounded flex flex-col items-center justify-center text-red-700 flex-shrink-0">
                  <FileText className="w-6 h-6" />
                  <span className="text-[9px] font-bold font-mono uppercase mt-0.5">PDF</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{selectedPreset.file}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Document Type: {selectedPreset.type.replace('_', ' ').toUpperCase()}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      selectedPreset.status === 'COMPLETE' ? 'bg-emerald-100 text-emerald-800' :
                      selectedPreset.status === 'MISMATCH' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {selectedPreset.status === 'COMPLETE' && '✓ Verification Ready'}
                      {selectedPreset.status === 'MISMATCH' && '⚠ Discrepancy Detected'}
                      {selectedPreset.status === 'DEFICIENT' && '✕ Deficient Document'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Tampering Checks */}
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center">
                <Scan className="w-3.5 h-3.5 mr-1.5 text-indigo-700" />
                Image Quality & Security Checks
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">Scan Resolution:</span>
                  <span className="font-mono font-medium text-slate-900">{selectedPreset.quality.resolutionDpi} DPI</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">Blur / Illegibility Index:</span>
                  <span className={`font-mono font-medium ${
                    selectedPreset.quality.blurScore.includes('High') ? 'text-rose-600 font-bold' : 'text-slate-900'
                  }`}>
                    {selectedPreset.quality.blurScore}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">Tamper & Artifact Detection:</span>
                  <span className="text-slate-800 font-medium">{selectedPreset.quality.tamperFlag}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Official Seal / Emblem:</span>
                  <span className="text-slate-800 font-medium">{selectedPreset.quality.sealDetected}</span>
                </div>
              </div>
            </div>

            {/* Rule-based checks summary */}
            <div className="border border-slate-200 rounded-lg p-4 bg-white">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                Rule-Based Consistency Checks
              </h4>
              <div className="space-y-2">
                {selectedPreset.rules.map((r, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs">
                    {r.passed ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className={r.passed ? 'text-slate-700' : 'text-rose-800 font-medium'}>
                        {r.check}
                      </span>
                      {r.warning && (
                        <div className="text-[11px] text-rose-600 font-semibold mt-0.5">
                          Alert: {r.warning}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Extracted Fields Review & Manual Correction (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Extracted Credential Data</h4>
                  <p className="text-xs text-slate-500">
                    Values identified via optical character recognition and natural language entity mapping.
                  </p>
                </div>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center space-x-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Correct Fields</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-2 py-1 text-xs rounded border border-slate-300 text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveCorrection}
                      className="px-3 py-1 text-xs font-bold rounded bg-emerald-600 text-white hover:bg-emerald-700 flex items-center space-x-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Fields Table / Form */}
              <div className="space-y-3">
                {Object.entries(extractedData).map(([key, val]) => {
                  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center py-1.5 border-b border-slate-100 text-xs">
                      <span className="font-medium text-slate-600">{label}:</span>
                      <div className="sm:col-span-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedFields[key] || ''}
                            onChange={(e) => setEditedFields({ ...editedFields, [key]: e.target.value })}
                            className="w-full text-xs border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-indigo-600"
                          />
                        ) : (
                          <span className="font-semibold text-slate-900 font-mono bg-slate-50 px-2 py-1 rounded border border-slate-200/80 inline-block w-full">
                            {val}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Outcome Banner */}
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="text-xs font-bold uppercase text-slate-500 mb-2">Automated Advisory Outcome</div>
                {selectedPreset.status === 'COMPLETE' && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Information Extracted Successfully (Confidence: {selectedPreset.confidence}%)</div>
                      <div className="text-emerald-800 mt-0.5">
                        Document appears complete and all mandatory entity checks match application records. Ready for Scrutiny Desk confirmation.
                      </div>
                    </div>
                  </div>
                )}

                {selectedPreset.status === 'MISMATCH' && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Field Mismatch Detected (Confidence: {selectedPreset.confidence}%)</div>
                      <div className="text-amber-800 mt-0.5">
                        Candidate name expansion disparity detected between application form ("Jampa Dorjee Bhotia") and document text ("Jampa D. Bhotia"). Applicant may review and verify accuracy.
                      </div>
                    </div>
                  </div>
                )}

                {selectedPreset.status === 'DEFICIENT' && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Deficiency Alert: Image Unclear / Expired Certificate (Confidence: {selectedPreset.confidence}%)</div>
                      <div className="text-rose-800 mt-0.5">
                        Document issued in FY 2022-23 (clause 4.2 requires FY 2025-26) and revenue seal is illegible. Manual re-upload of fresh certificate requested.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
