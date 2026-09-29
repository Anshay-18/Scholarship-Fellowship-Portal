import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm Decision', 
  cancelText = 'Cancel',
  isDestructive = false,
  requireRemarks = false,
  remarksPlaceholder = 'Enter official justification / remarks for scrutiny record...',
  presetReasons = []
}) => {
  const [remarks, setRemarks] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (requireRemarks && !remarks.trim() && !selectedPreset) {
      setError('Official remarks or selection of a standard reason is mandatory for administrative audit.');
      return;
    }
    const finalRemark = selectedPreset ? (remarks.trim() ? `${selectedPreset}: ${remarks.trim()}` : selectedPreset) : remarks.trim();
    onConfirm(finalRemark);
    setRemarks('');
    setSelectedPreset('');
    setError('');
  };

  const handlePresetSelect = (reason) => {
    setSelectedPreset(reason);
    if (!remarks) {
      setRemarks(reason);
    }
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
        {/* Top bar */}
        <div className={`px-5 py-4 flex items-center justify-between text-white ${
          isDestructive ? 'bg-rose-900' : 'bg-[#0f2537]'
        }`}>
          <div className="flex items-center space-x-2.5">
            {isDestructive ? (
              <ShieldAlert className="w-5 h-5 text-rose-300" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            )}
            <h3 className="text-base font-bold">{title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">{message}</p>

          {/* Preset Reasons dropdown if provided */}
          {presetReasons && presetReasons.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Standard Scrutiny Category / Deficiency Reason:
              </label>
              <select
                value={selectedPreset}
                onChange={(e) => handlePresetSelect(e.target.value)}
                className="w-full text-xs rounded border border-slate-300 bg-white p-2 text-slate-800 focus:border-indigo-600 focus:outline-none"
              >
                <option value="">-- Select standard clause / deficiency type --</option>
                {presetReasons.map((reason, idx) => (
                  <option key={idx} value={reason}>{reason}</option>
                ))}
              </select>
            </div>
          )}

          {/* Remarks input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Official Officer Remarks {requireRemarks ? <span className="text-rose-600">*</span> : <span className="text-slate-400 font-normal">(Optional)</span>}:
              </label>
              <span className="text-[10px] text-slate-400">Recorded in Immutable Audit Trail</span>
            </div>
            <textarea
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value);
                if (error) setError('');
              }}
              rows={3}
              placeholder={remarksPlaceholder}
              className={`w-full text-xs rounded border p-2.5 text-slate-800 focus:outline-none ${
                error ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 focus:border-indigo-600'
              }`}
            />
            {error && (
              <p className="text-xs text-rose-600 mt-1 flex items-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                {error}
              </p>
            )}
          </div>

          <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
            <span className="font-semibold text-slate-800">Human-in-the-Loop Oversight:</span> This action is an authoritative officer decision. AI extraction insights are advisory only and do not replace officer scrutiny.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded text-xs font-medium border border-slate-300 text-slate-700 bg-white hover:bg-slate-100"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-1.5 rounded text-xs font-semibold text-white shadow-sm flex items-center space-x-1 ${
              isDestructive 
                ? 'bg-rose-700 hover:bg-rose-800' 
                : 'bg-[#1b365d] hover:bg-[#0f2537]'
            }`}
          >
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
