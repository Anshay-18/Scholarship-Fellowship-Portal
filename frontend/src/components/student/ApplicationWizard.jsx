import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIDocumentIntelligenceDemo } from './AIDocumentIntelligenceDemo';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  Send, 
  FileText, 
  AlertCircle, 
  Printer, 
  Building, 
  GraduationCap, 
  User, 
  Home, 
  ShieldCheck, 
  Sparkles,
  Check
} from 'lucide-react';

const STEPS = [
  { step: 1, title: 'Personal Details', icon: User },
  { step: 2, title: 'Address & Contact', icon: Home },
  { step: 3, title: 'Academic Qualifications', icon: GraduationCap },
  { step: 4, title: 'Scheme & Research', icon: Building },
  { step: 5, title: 'Eligibility Questionnaire', icon: ShieldCheck },
  { step: 6, title: 'AI Document Upload', icon: Sparkles },
  { step: 7, title: 'Review & Declaration', icon: FileText },
  { step: 8, title: 'Submission Confirmation', icon: CheckCircle2 }
];

export const ApplicationWizard = ({ preselectedSchemeId = 'NFST', onNavigate }) => {
  const { schemes, submitNewApplication } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [draftSaved, setDraftSaved] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState(null);
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    schemeId: preselectedSchemeId,
    personal: {
      fullName: 'Rajeshwari Marandi',
      fatherName: 'Mangal Marandi',
      dob: '1998-05-14',
      gender: 'Female',
      tribe: 'Santhal',
      subCaste: 'Manjhi-Haram',
      maritalStatus: 'Unmarried',
      aadhaarVirtualId: '9182-4412-8809',
      isDifferentlyAbled: 'No',
      familyIncome: '180000'
    },
    address: {
      state: 'Jharkhand',
      district: 'Ranchi',
      block: 'Murhu',
      pincode: '835216',
      addressLine: 'Vill: Murhu, Post: Murhu, PS: Khunti',
      mobile: '+91 94311 82910',
      email: 'rajeshwari.marandi@demo.gov.in'
    },
    academic: {
      studyLevel: 'Ph.D.',
      institution: 'Ranchi University, Jharkhand',
      department: 'Department of Tribal & Regional Languages',
      supervisor: 'Prof. Birendra Kumar Soy',
      researchTopic: 'Ethno-linguistic Documentation and Morphosyntax of Santhali Dialects in Chota Nagpur Plateau',
      qualifyingExam: 'UGC-NET (June 2024)',
      examRoll: 'JH04001928',
      masterDegree: 'M.A. Linguistics',
      percentage: '68.4',
      admissionDate: '2024-01-15'
    },
    eligibility: {
      stDomicileConfirmed: true,
      incomeWithinCeiling: true,
      fullTimeRegularConfirmed: true,
      noOtherScholarship: true,
      employedInGovt: false
    },
    declaration: {
      termsAccepted: false,
      accuracyConfirmed: false
    }
  });

  const selectedScheme = schemes.find(s => s.id === formData.schemeId) || schemes[0];

  // Validation per step
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.personal.fullName) errs.fullName = 'Full Name is required as per ST certificate';
      if (!formData.personal.fatherName) errs.fatherName = 'Father’s Name is required';
      if (!formData.personal.dob) errs.dob = 'Date of birth is required';
      if (!formData.personal.tribe) errs.tribe = 'Scheduled Tribe community is required';
    } else if (step === 2) {
      if (!formData.address.state) errs.state = 'State is required';
      if (!formData.address.district) errs.district = 'District is required';
      if (!formData.address.pincode) errs.pincode = 'PIN code is required';
      if (!formData.address.mobile) errs.mobile = 'Mobile number is required';
    } else if (step === 3) {
      if (!formData.academic.institution) errs.institution = 'Institution name is required';
      if (!formData.academic.percentage) errs.percentage = 'Qualifying percentage is required';
    } else if (step === 5) {
      if (!formData.eligibility.stDomicileConfirmed) errs.stDomicile = 'You must confirm Scheduled Tribe status';
      if (!formData.eligibility.fullTimeRegularConfirmed) errs.regular = 'Confirmation of regular full-time enrollment is mandatory';
      if (!formData.eligibility.noOtherScholarship) errs.scholarship = 'Candidate must not receive duplicate central fellowship';
    } else if (step === 7) {
      if (!formData.declaration.termsAccepted || !formData.declaration.accuracyConfirmed) {
        errs.declaration = 'You must accept the statutory Government of India declaration';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 8));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleSubmit = () => {
    if (validateStep(7)) {
      const appId = submitNewApplication(formData);
      setGeneratedAppId(appId);
      setCurrentStep(8);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Wizard Header Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs text-indigo-700 font-bold uppercase tracking-wider">
              <span>National Scholarship Portal</span>
              <span>•</span>
              <span>MoTA Form S-26</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Online Application: {selectedScheme.name}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Academic Session 2026–27 | Scheme Code: <span className="font-mono font-semibold">{selectedScheme.code}</span>
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveDraft}
              className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{draftSaved ? '✓ Draft Saved' : 'Save Draft'}</span>
            </button>
            <span className="text-xs font-mono font-bold px-2.5 py-1.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
              Step {currentStep} / 8
            </span>
          </div>
        </div>

        {/* Multi-step Stepper Indicator */}
        <div className="mt-6 pt-4 border-t border-slate-100 overflow-x-auto">
          <div className="flex items-center min-w-[720px] justify-between">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isDone = s.step < currentStep;
              const isCurrent = s.step === currentStep;

              return (
                <div 
                  key={s.step} 
                  onClick={() => {
                    if (s.step < currentStep) setCurrentStep(s.step);
                  }}
                  className={`flex flex-col items-center cursor-pointer group w-24 text-center ${
                    s.step < currentStep ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isDone 
                      ? 'bg-emerald-600 text-white' 
                      : isCurrent 
                        ? 'bg-[#1b365d] text-white ring-4 ring-indigo-100' 
                        : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}>
                    {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[11px] mt-1.5 font-medium leading-tight line-clamp-1 ${
                    isCurrent ? 'text-indigo-950 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Contents */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              1. Personal Details of the Applicant
            </h3>
            <p className="text-xs text-slate-500">
              Provide authentic personal details exactly as recorded in your Scheduled Tribe Certificate and Matriculation Records.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name of Candidate <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.personal.fullName}
                  onChange={(e) => setFormData({ ...formData, personal: { ...formData.personal, fullName: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
                {errors.fullName && <p className="text-[11px] text-rose-600 mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Father's / Guardian's Name <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.personal.fatherName}
                  onChange={(e) => setFormData({ ...formData, personal: { ...formData.personal, fatherName: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
                {errors.fatherName && <p className="text-[11px] text-rose-600 mt-0.5">{errors.fatherName}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Date of Birth <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="date"
                  value={formData.personal.dob}
                  onChange={(e) => setFormData({ ...formData, personal: { ...formData.personal, dob: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
                {errors.dob && <p className="text-[11px] text-rose-600 mt-0.5">{errors.dob}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Gender <span className="text-rose-600">*</span>:
                </label>
                <select
                  value={formData.personal.gender}
                  onChange={(e) => setFormData({ ...formData, personal: { ...formData.personal, gender: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Third Gender">Third Gender</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Scheduled Tribe (ST) Community <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.personal.tribe}
                  onChange={(e) => setFormData({ ...formData, personal: { ...formData.personal, tribe: e.target.value } })}
                  placeholder="e.g. Santhal, Oraon, Munda, Gond, Bhil, Bodo"
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
                {errors.tribe && <p className="text-[11px] text-rose-600 mt-0.5">{errors.tribe}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Aadhaar Virtual ID (VID) / Masked ID:
                </label>
                <input
                  type="text"
                  value={formData.personal.aadhaarVirtualId}
                  onChange={(e) => setFormData({ ...formData, personal: { ...formData.personal, aadhaarVirtualId: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Annual Family Income (₹) <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="number"
                  value={formData.personal.familyIncome}
                  onChange={(e) => setFormData({ ...formData, personal: { ...formData.personal, familyIncome: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                />
                <p className="text-[11px] text-slate-500 mt-0.5">As per competent revenue authority certificate</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Person with Benchmark Disability (PwD):
                </label>
                <select
                  value={formData.personal.isDifferentlyAbled}
                  onChange={(e) => setFormData({ ...formData, personal: { ...formData.personal, isDifferentlyAbled: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                >
                  <option value="No">No</option>
                  <option value="Yes (Visual Impairment)">Yes (Visual Impairment)</option>
                  <option value="Yes (Locomotor Disability)">Yes (Locomotor Disability)</option>
                  <option value="Yes (Hearing Impairment)">Yes (Hearing Impairment)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact & Address */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              2. Permanent & Communication Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Permanent Address Line (Village / Street / Post Office) <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.address.addressLine}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, addressLine: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  State / UT <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
                {errors.state && <p className="text-[11px] text-rose-600 mt-0.5">{errors.state}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  District <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.address.district}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, district: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
                {errors.district && <p className="text-[11px] text-rose-600 mt-0.5">{errors.district}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  PIN Code <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.address.pincode}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, pincode: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                />
                {errors.pincode && <p className="text-[11px] text-rose-600 mt-0.5">{errors.pincode}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mobile Number (Aadhaar Seeded) <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.address.mobile}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, mobile: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                />
                {errors.mobile && <p className="text-[11px] text-rose-600 mt-0.5">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="email"
                  value={formData.address.email}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, email: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Academic Qualifications */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              3. Academic Qualifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Qualifying Master’s Degree <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.academic.masterDegree}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, masterDegree: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Aggregate Percentage / Equivalent CGPA <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.academic.percentage}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, percentage: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                />
                <p className="text-[11px] text-slate-500 mt-0.5">Minimum 55% aggregate required for ST category</p>
                {errors.percentage && <p className="text-[11px] text-rose-600 mt-0.5">{errors.percentage}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  National Competitive Examination Qualified:
                </label>
                <select
                  value={formData.academic.qualifyingExam}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, qualifyingExam: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                >
                  <option value="UGC-NET (June 2024)">UGC-NET (Junior Research Fellowship / Lectureship)</option>
                  <option value="CSIR-UGC NET">CSIR-UGC NET (Life/Chemical/Physical Sciences)</option>
                  <option value="GATE">GATE (Engineering / Technology)</option>
                  <option value="IELTS / PTE / TOEFL">IELTS / PTE / TOEFL (For NOS Overseas Scheme)</option>
                  <option value="Direct University Entrance">Direct University Ph.D. Entrance Examination</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Exam Roll Number / Scorecard ID:
                </label>
                <input
                  type="text"
                  value={formData.academic.examRoll}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, examRoll: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Scheme & Research / Study Plan */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              4. Scheme Selection & Research / Higher Study Particulars
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Selected Centrally Sponsored Scheme <span className="text-rose-600">*</span>:
                </label>
                <select
                  value={formData.schemeId}
                  onChange={(e) => setFormData({ ...formData, schemeId: e.target.value })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600 font-semibold"
                >
                  {schemes.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Level of Proposed Study <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.academic.studyLevel}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, studyLevel: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  University / Enrolled Higher Educational Institution <span className="text-rose-600">*</span>:
                </label>
                <input
                  type="text"
                  value={formData.academic.institution}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, institution: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
                {errors.institution && <p className="text-[11px] text-rose-600 mt-0.5">{errors.institution}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Department / Center of Study:
                </label>
                <input
                  type="text"
                  value={formData.academic.department}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, department: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Research Guide / Faculty Supervisor:
                </label>
                <input
                  type="text"
                  value={formData.academic.supervisor}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, supervisor: e.target.value } })}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">
                  Title / Subject of Ph.D. Dissertation / Research Synopsis:
                </label>
                <textarea
                  value={formData.academic.researchTopic}
                  onChange={(e) => setFormData({ ...formData, academic: { ...formData.academic, researchTopic: e.target.value } })}
                  rows={2}
                  className="w-full border border-slate-300 rounded p-2 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Eligibility Questionnaire */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              5. Statutory Eligibility Self-Assessment Questionnaire
            </h3>
            <p className="text-xs text-slate-500">
              Confirm each statutory declaration below. Misrepresentation is subject to recovery with penal interest.
            </p>

            <div className="space-y-3 pt-2">
              <label className="flex items-start space-x-3 p-3 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.eligibility.stDomicileConfirmed}
                  onChange={(e) => setFormData({ ...formData, eligibility: { ...formData.eligibility, stDomicileConfirmed: e.target.checked } })}
                  className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900">1. Scheduled Tribe Community Verification:</strong> I certify that I belong to a notified Scheduled Tribe community recognized under Article 342 of the Constitution of India, and possess a valid caste certificate issued by an authorized Sub-Divisional Officer (SDO) / District Magistrate.
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.eligibility.incomeWithinCeiling}
                  onChange={(e) => setFormData({ ...formData, eligibility: { ...formData.eligibility, incomeWithinCeiling: e.target.checked } })}
                  className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900">2. Family Income Compliance:</strong> I declare that the total gross family income from all sources does not exceed the statutory ceiling stipulated for the applied scheme.
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.eligibility.fullTimeRegularConfirmed}
                  onChange={(e) => setFormData({ ...formData, eligibility: { ...formData.eligibility, fullTimeRegularConfirmed: e.target.checked } })}
                  className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900">3. Regular & Full-Time Enrollment:</strong> I am enrolled as a regular, full-time scholar in the university and do not engage in part-time study or non-approved distance education.
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.eligibility.noOtherScholarship}
                  onChange={(e) => setFormData({ ...formData, eligibility: { ...formData.eligibility, noOtherScholarship: e.target.checked } })}
                  className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900">4. Non-Receipt of Concurrent Central / State Fellowships:</strong> I am not in receipt of any concurrent scholarship, fellowship, or financial assistance from UGC, CSIR, ICAR, ICSSR, or any State Government scheme.
                </div>
              </label>
            </div>
            {Object.keys(errors).length > 0 && (
              <p className="text-xs text-rose-600 mt-2 font-medium">Please confirm all required declarations to proceed.</p>
            )}
          </div>
        )}

        {/* Step 6: AI-Assisted Document Upload */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                6. AI-Assisted Document Upload & Advisory Pre-screening
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our automated document intelligence pre-screens your uploaded caste and income certificates to alert you to illegible scans or field discrepancies before formal submission.
              </p>
            </div>

            <AIDocumentIntelligenceDemo initialPresetId="sample-expired-income" />
          </div>
        )}

        {/* Step 7: Review & Undertaking */}
        {currentStep === 7 && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
              7. Review Submitted Details & Formal Undertaking
            </h3>

            {/* Read-only Review Summary */}
            <div className="bg-slate-50 rounded border border-slate-200 p-4 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-2">Applicant Dossier Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500">Applicant:</span>
                    <div className="font-semibold text-slate-900">{formData.personal.fullName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Father's Name:</span>
                    <div className="font-semibold text-slate-900">{formData.personal.fatherName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Tribe / Domicile:</span>
                    <div className="font-semibold text-slate-900">{formData.personal.tribe} ({formData.address.state})</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Selected Scheme:</span>
                    <div className="font-semibold text-indigo-700">{selectedScheme.name}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Institution:</span>
                    <div className="font-semibold text-slate-900">{formData.academic.institution}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Qualifying Score:</span>
                    <div className="font-semibold text-slate-900">{formData.academic.percentage}% ({formData.academic.qualifyingExam})</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Undertaking Checkboxes */}
            <div className="p-4 rounded border border-amber-300 bg-amber-50/60 space-y-3">
              <h4 className="text-xs font-bold uppercase text-amber-900">
                Statutory Declaration Under Government of India Fellowship Rules
              </h4>

              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declaration.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, declaration: { ...formData.declaration, termsAccepted: e.target.checked } })}
                  className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-700">
                  I hereby declare that all particulars stated in this application are true, complete, and correct to the best of my knowledge. I have uploaded genuine copies of all required certificates.
                </span>
              </label>

              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declaration.accuracyConfirmed}
                  onChange={(e) => setFormData({ ...formData, declaration: { ...formData.declaration, accuracyConfirmed: e.target.checked } })}
                  className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-700">
                  I understand that if any document or statement is found false or misleading at any stage, the fellowship granted shall be cancelled forthwith, and all disbursed amounts recovered with penal interest as per Public Demands Recovery Act.
                </span>
              </label>
              {errors.declaration && <p className="text-xs text-rose-600 font-semibold">{errors.declaration}</p>}
            </div>
          </div>
        )}

        {/* Step 8: Submission Confirmation */}
        {currentStep === 8 && (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Application Successfully Submitted
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3">
                Government of India • Ministry of Tribal Affairs
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                Your application for <strong className="text-slate-800">{selectedScheme.name}</strong> has been registered in the Central Scrutiny Repository.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-md mx-auto text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Application Reference ID:</span>
                <span className="font-mono font-bold text-indigo-900 text-sm">{generatedAppId || 'MOTA-2026-NFST-0101'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-semibold text-slate-900">{formData.personal.fullName}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Submission Date & Time:</span>
                <span className="font-mono text-slate-700">{new Date().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Assigned Verification Desk:</span>
                <span className="font-semibold text-slate-800">Desk 3 (Eastern Zone)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Acknowledgement Receipt</span>
              </button>
              <button
                onClick={() => onNavigate('track')}
                className="px-4 py-2 rounded bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
              >
                <span>Track Application Lifecycle</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        {currentStep < 8 && (
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold disabled:opacity-40 flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4 mr-0.5" />
              <span>Previous Step</span>
            </button>

            {currentStep < 7 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded bg-[#1b365d] hover:bg-[#0f2537] text-white text-xs font-bold flex items-center space-x-1 shadow-sm transition"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition"
              >
                <Send className="w-4 h-4 mr-1" />
                <span>Submit Final Application</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
