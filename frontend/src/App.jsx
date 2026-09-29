import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { DemoHelperBar } from './components/common/DemoHelperBar';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';
import { NotificationsModal } from './components/common/NotificationsModal';
import { StudentPortal } from './components/student/StudentPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  Phone, 
  Mail, 
  Sparkles,
  Info
} from 'lucide-react';

const AppContent = () => {
  const { currentRole } = useApp();
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans">
      {/* 1. Institutional Government Header */}
      <Header 
        onOpenRoleModal={() => setRoleModalOpen(true)}
        onOpenNotifications={() => setNotifModalOpen(true)}
      />

      {/* 2. Interactive Judge Walkthrough / Demo Assistant Bar */}
      <DemoHelperBar />

      {/* 3. Main Portal Body */}
      <main className="flex-1 pb-12">
        {currentRole === 'student' ? (
          <StudentPortal />
        ) : (
          <AdminPortal />
        )}
      </main>

      {/* 4. Official Institutional Footer */}
      <footer className="bg-[#0f2537] text-white border-t border-slate-800 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800 text-slate-300">
            {/* Col 1 */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>Ministry of Tribal Affairs</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Government of India, Shastri Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001
              </p>
              <div className="pt-1 text-[11px] text-amber-300 font-hindi">
                जनजातीय कार्य मंत्रालय, भारत सरकार
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Flagship Schemes</h4>
              <ul className="space-y-1 text-slate-400 text-[11px]">
                <li>• National Fellowship for Scheduled Tribes (NFST)</li>
                <li>• National Overseas Scholarship for ST Candidates (NOS)</li>
                <li>• Pre-Matric & Post-Matric Scholarships for STs</li>
                <li>• Special Central Assistance to Tribal Sub-Scheme</li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Helpdesk & Support</h4>
              <div className="space-y-1 text-slate-400 text-[11px]">
                <p className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Toll Free: 1800-11-7788 (9:30 AM - 5:30 PM)</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email: fellowship-mota@gov.in</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Official Portal: tribal.nic.in</span>
                </p>
              </div>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">SIH 2026 Evaluation</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Smart India Hackathon 2026 Prototype • Problem Statement: AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes.
              </p>
              <div className="mt-2 text-[10px] font-mono bg-white/5 p-2 rounded border border-white/10 text-amber-200">
                Advisory AI Document Intelligence • Human Scrutiny Sign-Off • Spring Boot / MySQL API Ready
              </div>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-slate-400 text-[11px] gap-2">
            <div>
              Designed & Developed for Ministry of Tribal Affairs (Demonstration Environment).
            </div>
            <div className="flex items-center space-x-4">
              <span>National Informatics Centre (NIC) Standards</span>
              <span>•</span>
              <span>Accessibility Guidelines (GIGW 3.0)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Role Switcher Modal */}
      <RoleSwitcherModal 
        isOpen={roleModalOpen} 
        onClose={() => setRoleModalOpen(false)} 
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notifModalOpen}
        onClose={() => setNotifModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
