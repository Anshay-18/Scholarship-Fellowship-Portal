import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  Bell, 
  RotateCcw, 
  Eye, 
  Type, 
  ChevronDown,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export const Header = ({ onOpenRoleModal, onOpenNotifications }) => {
  const { 
    currentRole, 
    currentUser, 
    switchRole, 
    resetToDefaultData, 
    fontScale, 
    setFontScale, 
    highContrast, 
    setHighContrast,
    isDemoGuideOpen,
    setIsDemoGuideOpen,
    applications
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Calculate pending notifications for badge
  const pendingDeficienciesCount = applications.filter(a => a.verificationStatus === 'DEFICIENCY_RAISED').length;
  const urgentCount = applications.filter(a => a.urgentAttention).length;

  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      {/* 1. Indian Tricolor Decorative Accent Bar */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white border-y border-slate-200"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* 2. Official Government of India Top Strip */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-slate-100 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            भारत सरकार | Government of India
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">जनजातीय कार्य मंत्रालय | Ministry of Tribal Affairs</span>
        </div>

        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          {/* Prototype disclaimer pill */}
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-mono text-[11px] tracking-wide flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5"></span>
            SIH 2026 Prototype Environment
          </span>

          {/* Accessibility controls */}
          <div className="hidden md:flex items-center space-x-1 pl-2 border-l border-slate-700">
            <button 
              onClick={() => setFontScale(0.9)} 
              title="Decrease font size" 
              className={`px-1.5 py-0.5 rounded hover:bg-slate-800 ${fontScale === 0.9 ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
            >
              A-
            </button>
            <button 
              onClick={() => setFontScale(1)} 
              title="Standard font size" 
              className={`px-1.5 py-0.5 rounded hover:bg-slate-800 ${fontScale === 1 ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
            >
              A
            </button>
            <button 
              onClick={() => setFontScale(1.1)} 
              title="Increase font size" 
              className={`px-1.5 py-0.5 rounded hover:bg-slate-800 ${fontScale === 1.1 ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
            >
              A+
            </button>
            <button 
              onClick={() => setHighContrast(!highContrast)} 
              title="Toggle contrast" 
              className={`px-1.5 py-0.5 rounded hover:bg-slate-800 ml-1 text-slate-300 flex items-center gap-1 ${highContrast ? 'bg-amber-500 text-slate-950 font-bold' : ''}`}
            >
              <Eye className="w-3 h-3" />
              <span>Contrast</span>
            </button>
          </div>

          {/* Toggle Demo Guide Helper */}
          <button 
            onClick={() => setIsDemoGuideOpen(!isDemoGuideOpen)}
            className="flex items-center space-x-1 text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition"
            title="Toggle judge demonstration walkthrough helper"
          >
            <HelpCircle className="w-3 h-3 text-amber-400" />
            <span className="text-[11px] font-medium">{isDemoGuideOpen ? 'Hide Demo Guide' : 'Show Demo Guide'}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Institutional Branding Bar */}
      <div className="bg-gradient-to-r from-[#0f2537] via-[#1a365d] to-[#0f2537] text-white px-4 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Institutional Typography */}
          <div className="flex items-center space-x-3.5">
            {/* Emblem representation */}
            <div className="w-11 h-11 rounded border border-white/20 bg-white/10 flex flex-col items-center justify-center p-1 shadow-inner flex-shrink-0">
              <Building2 className="w-6 h-6 text-amber-300" />
              <span className="text-[8px] tracking-wider text-slate-200 uppercase font-mono font-bold mt-0.5">MoTA</span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <p className="text-xs font-medium text-amber-300 font-hindi tracking-wide">जनजातीय कार्य मंत्रालय, भारत सरकार</p>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-[11px] text-slate-300 font-medium tracking-wide">Government of India</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                AI-Enabled ST Scholarship & Fellowship Portal
                <span className="hidden lg:inline-block text-[10px] uppercase font-normal bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 px-2 py-0.5 rounded">
                  NFST & NOS Schemes
                </span>
              </h1>
              <p className="text-xs text-slate-300 hidden sm:block">
                Unified Scrutiny, Document Verification & Post-Selection Management System
              </p>
            </div>
          </div>

          {/* Role Switcher & User Profile Controls */}
          <div className="flex items-center flex-wrap gap-2 self-start md:self-auto">
            {/* Quick Role Switch Buttons */}
            <div className="bg-slate-900/60 p-1 rounded-lg border border-white/15 flex items-center text-xs">
              <button
                onClick={() => switchRole('student')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded transition font-medium ${
                  currentRole === 'student' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                title="Switch to Student Applicant view"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                onClick={() => switchRole('officer')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded transition font-medium ${
                  currentRole === 'officer' 
                    ? 'bg-amber-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                title="Switch to Verification Officer view"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification Officer</span>
              </button>

              <button
                onClick={() => switchRole('admin')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded transition font-medium ${
                  currentRole === 'admin' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                title="Switch to Ministry Administrator view"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Ministry Admin</span>
              </button>
            </div>

            {/* Current Active User Badge */}
            <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-xs hidden xl:block">
              <div className="text-[10px] text-slate-300 uppercase font-mono">Logged in as</div>
              <div className="font-semibold text-white truncate max-w-[160px]">{currentUser.name}</div>
            </div>

            {/* Notifications Button */}
            <button 
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition"
              title="Notifications & Alerts"
            >
              <Bell className="w-4 h-4" />
              {(pendingDeficienciesCount > 0 || urgentCount > 0) && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {currentRole === 'student' ? (pendingDeficienciesCount > 0 ? '1' : '0') : pendingDeficienciesCount}
                </span>
              )}
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (window.confirm('Reset all demo applications, deficiency records, and audit logs to initial seed state?')) {
                  resetToDefaultData();
                }
              }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-amber-300 transition"
              title="Reset Demo Data to Initial State"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
