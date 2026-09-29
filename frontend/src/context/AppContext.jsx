import React, { createContext, useContext, useState, useEffect } from 'react';
import { SCHEMES, DEMO_USERS, INITIAL_APPLICATIONS, INITIAL_AUDIT_LOGS } from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEYS = {
  ROLE: 'mota_sih26_role',
  APPLICATIONS: 'mota_sih26_applications',
  SCHEMES: 'mota_sih26_schemes',
  AUDIT_LOGS: 'mota_sih26_audit_logs',
  SELECTED_APP: 'mota_sih26_selected_app',
  DEMO_STEP: 'mota_sih26_demo_step'
};

export const AppProvider = ({ children }) => {
  // Active role: 'student' | 'officer' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ROLE) || 'student';
  });

  // Applications list
  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return stored ? JSON.parse(stored) : INITIAL_APPLICATIONS;
    } catch (e) {
      console.error('Error parsing stored applications, fallback to initial', e);
      return INITIAL_APPLICATIONS;
    }
  });

  // Schemes with configurable rules
  const [schemes, setSchemes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SCHEMES);
      return stored ? JSON.parse(stored) : SCHEMES;
    } catch (e) {
      return SCHEMES;
    }
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return stored ? JSON.parse(stored) : INITIAL_AUDIT_LOGS;
    } catch (e) {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // Selected application ID for review workspace / student detail
  const [selectedAppId, setSelectedAppId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_APP) || 'MOTA-2026-NFST-0101';
  });

  // Demo step state for 3-5 min presentation guide
  const [demoStep, setDemoStep] = useState(() => {
    const val = localStorage.getItem(STORAGE_KEYS.DEMO_STEP);
    return val ? parseInt(val, 10) : 1;
  });

  // UI state: High contrast mode & Font scale
  const [fontScale, setFontScale] = useState(1); // 0.9 = A-, 1 = A, 1.1 = A+
  const [highContrast, setHighContrast] = useState(false);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHEMES, JSON.stringify(schemes));
  }, [schemes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_APP, selectedAppId);
  }, [selectedAppId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEMO_STEP, demoStep.toString());
  }, [demoStep]);

  // Current user based on role
  const currentUser = DEMO_USERS[currentRole] || DEMO_USERS.student;

  // Active selected application object
  const activeApplication = applications.find(app => app.id === selectedAppId) || applications[0];

  // Helper to add audit entry
  const addAuditLog = (action, appId, prevStatus, newStatus, remarks) => {
    const newEntry = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: `${currentUser.name} (${currentUser.role.replace('_', ' ')})`,
      action,
      appId,
      prevStatus,
      newStatus,
      remarks: remarks || 'Action recorded in official portal ledger'
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Switch role helper
  const switchRole = (newRole) => {
    if (DEMO_USERS[newRole]) {
      setCurrentRole(newRole);
    }
  };

  // Raise deficiency (Officer action)
  const raiseDeficiency = (appId, { category, documentType, officerNote, deadline }) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const prevStatus = app.verificationStatus;
      const newStatus = 'DEFICIENCY_RAISED';

      const updatedDocs = app.documents.map(doc => {
        if (doc.type === documentType) {
          return { ...doc, status: 'DEFICIENT', officerRemark: officerNote };
        }
        return doc;
      });

      const updatedApp = {
        ...app,
        stage: 'DOCUMENT_VERIFICATION',
        verificationStatus: newStatus,
        urgentAttention: true,
        deficiency: {
          hasDeficiency: true,
          noticeId: `DEF-MOTA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          dateRaised: new Date().toISOString().slice(0, 10),
          deadline: deadline || '2026-10-15',
          raisedBy: currentUser.name,
          category: category || 'DOCUMENT_DEFECT',
          documentType,
          officerNote,
          applicantResponse: null,
          resubmittedDoc: null,
          resolved: false
        },
        documents: updatedDocs,
        timeline: [
          ...app.timeline,
          {
            id: `tl-${Date.now()}`,
            stage: 'Deficiency Notice Raised',
            timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
            actor: `${currentUser.name} (${currentUser.designation || 'Verification Officer'})`,
            description: `Deficiency raised: ${officerNote}`
          }
        ]
      };

      addAuditLog('RAISED_DEFICIENCY', appId, prevStatus, newStatus, officerNote);
      return updatedApp;
    }));
  };

  // Resolve deficiency (Student action)
  const resolveDeficiency = (appId, { applicantResponse, newDocFileName, extractedData }) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const prevStatus = app.verificationStatus;
      const newStatus = 'DEFICIENCY_RESOLVED';

      const updatedDocs = app.documents.map(doc => {
        if (app.deficiency && doc.type === app.deficiency.documentType) {
          return {
            ...doc,
            fileName: newDocFileName || 'Income_Certificate_FY2526_Verified.pdf',
            uploadDate: new Date().toISOString().slice(0, 10),
            status: 'DEFICIENCY_RESOLVED',
            aiStatus: 'EXTRACTED_MATCH',
            aiConfidence: 98,
            extractedData: extractedData || {
              candidateName: app.applicantName,
              fatherName: app.fatherName,
              certificateNo: `JH/RNC/INC/2026/${Math.floor(10000 + Math.random() * 90000)}`,
              issuingAuthority: 'Tahsildar & Executive Magistrate, Ranchi',
              issueDate: '2026-09-25 (Current FY 2025-26)',
              annualIncome: `₹${app.annualFamilyIncome.toLocaleString('en-IN')}`,
              matchScore: 100
            }
          };
        }
        return doc;
      });

      const updatedApp = {
        ...app,
        verificationStatus: newStatus,
        urgentAttention: false,
        deficiency: {
          ...app.deficiency,
          applicantResponse,
          resubmittedDoc: newDocFileName || 'Income_Certificate_FY2526_Verified.pdf',
          resolved: true,
          resolvedDate: new Date().toISOString().slice(0, 10)
        },
        documents: updatedDocs,
        timeline: [
          ...app.timeline,
          {
            id: `tl-${Date.now()}`,
            stage: 'Deficiency Clarification Resubmitted',
            timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
            actor: `Applicant (${app.applicantName})`,
            description: `Applicant submitted corrected document: ${applicantResponse}`
          }
        ]
      };

      addAuditLog('RESOLVED_DEFICIENCY', appId, prevStatus, newStatus, `Applicant uploaded corrected document with remark: "${applicantResponse}"`);
      return updatedApp;
    }));
  };

  // Mark document verified (Officer action)
  const verifyDocument = (appId, docId, officerRemark) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const updatedDocs = app.documents.map(doc => {
        if (doc.id === docId) {
          return { ...doc, status: 'VERIFIED', officerRemark: officerRemark || 'Verified against designated repository' };
        }
        return doc;
      });

      // If all documents are verified, update verificationStatus to VERIFIED
      const allVerified = updatedDocs.every(d => d.status === 'VERIFIED');
      const prevStatus = app.verificationStatus;
      const newStatus = allVerified ? 'VERIFIED' : app.verificationStatus;

      const updatedApp = {
        ...app,
        verificationStatus: newStatus,
        documents: updatedDocs,
        timeline: [
          ...app.timeline,
          {
            id: `tl-${Date.now()}`,
            stage: 'Document Marked Verified',
            timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
            actor: `${currentUser.name}`,
            description: `Document ${docId} verified. Remark: ${officerRemark || 'Approved'}`
          }
        ]
      };

      addAuditLog('VERIFIED_DOCUMENT', appId, prevStatus, newStatus, `Verified document: ${docId}. ${officerRemark || ''}`);
      return updatedApp;
    }));
  };

  // Forward to Scrutiny Committee
  const forwardToScrutiny = (appId, remarks) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const prevStage = app.stage;
      const newStage = 'SCRUTINY';

      const updatedApp = {
        ...app,
        stage: newStage,
        verificationStatus: 'VERIFIED',
        eligibilityStatus: 'ELIGIBLE',
        urgentAttention: false,
        timeline: [
          ...app.timeline,
          {
            id: `tl-${Date.now()}`,
            stage: 'Forwarded for Scrutiny',
            timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
            actor: `${currentUser.name} (${currentUser.designation || 'Verification Officer'})`,
            description: remarks || 'Eligibility checklist cleared. Transferred to Central Scrutiny Committee.'
          }
        ]
      };

      addAuditLog('FORWARDED_TO_SCRUTINY', appId, prevStage, newStage, remarks || 'Cleared eligibility and verified all documents.');
      return updatedApp;
    }));
  };

  // Final Award / Sanction
  const awardScholarship = (appId, awardDetails, remarks) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const prevStage = app.stage;
      const newStage = 'AWARDED';

      const updatedApp = {
        ...app,
        stage: newStage,
        awardDetails: awardDetails || {
          sanctionNumber: `MOTA/${app.schemeId}/2026/AW-${Math.floor(1000 + Math.random() * 9000)}`,
          sanctionDate: new Date().toISOString().slice(0, 10),
          sanctionedBy: `${currentUser.name}, Joint Secretary (MoTA)`,
          awardedDurationYears: app.schemeId === 'NOS' ? 2 : 5,
          annualAllowanceEuro: app.schemeId === 'NOS' ? '€15,400/yr' : '₹4,20,000/yr',
          tuitionFeeCovered: '100% Eligible Fee Disbursed via PFMS DBT',
          pfmsDbtLinked: true,
          bankAccountMasked: 'SBI - A/C XXXXXXXX4821 (Aadhaar Seeded)',
          disbursementHistory: [
            { installment: 'Installment 1', amount: app.schemeId === 'NOS' ? '€3,850' : '₹1,05,000', date: new Date().toISOString().slice(0, 10), status: 'DISBURSED', utr: `PFMS-DBT-2026-${Date.now().toString().slice(-6)}` }
          ]
        },
        timeline: [
          ...app.timeline,
          {
            id: `tl-${Date.now()}`,
            stage: 'Scholarship Awarded & Sanction Order Issued',
            timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
            actor: `${currentUser.name} (Scheme Director)`,
            description: remarks || 'Final selection confirmed. Sanction order signed.'
          }
        ]
      };

      addAuditLog('SCHOLARSHIP_AWARDED', appId, prevStage, newStage, remarks || 'Sanction order approved.');
      return updatedApp;
    }));
  };

  // Reject Application
  const rejectApplication = (appId, reason) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const prevStage = app.stage;
      const newStage = 'REJECTED';

      const updatedApp = {
        ...app,
        stage: newStage,
        verificationStatus: 'REJECTED',
        eligibilityStatus: 'INELIGIBLE',
        timeline: [
          ...app.timeline,
          {
            id: `tl-${Date.now()}`,
            stage: 'Application Rejected',
            timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
            actor: `${currentUser.name}`,
            description: `Application rejected: ${reason}`
          }
        ]
      };

      addAuditLog('APPLICATION_REJECTED', appId, prevStage, newStage, reason);
      return updatedApp;
    }));
  };

  // Submit new application (Student Wizard)
  const submitNewApplication = (formData) => {
    const scheme = schemes.find(s => s.id === formData.schemeId) || schemes[0];
    const generatedId = `MOTA-2026-${scheme.id}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApp = {
      id: generatedId,
      applicantName: formData.personal.fullName || 'Rajeshwari Marandi',
      fatherName: formData.personal.fatherName || 'Mangal Marandi',
      dob: formData.personal.dob || '1998-05-14',
      gender: formData.personal.gender || 'Female',
      tribe: formData.personal.tribe || 'Santhal',
      state: formData.address.state || 'Jharkhand',
      district: formData.address.district || 'Ranchi',
      address: `${formData.address.addressLine}, ${formData.address.district}, ${formData.address.state} - ${formData.address.pincode}`,
      email: formData.personal.email || 'applicant@demo.gov.in',
      phone: formData.personal.phone || '+91 94311 00000',
      schemeId: scheme.id,
      schemeName: scheme.name,
      studyLevel: formData.academic.studyLevel || 'Ph.D.',
      institution: formData.academic.institution || 'Ranchi University, Jharkhand',
      department: formData.academic.department || 'Department of Tribal Studies',
      supervisor: formData.academic.supervisor || 'Prof. B. K. Soy',
      researchTopic: formData.academic.researchTopic || 'Tribal Knowledge Systems and Indigenous Forest Conservation',
      qualifyingExam: formData.academic.qualifyingExam || 'UGC-NET',
      masterDegree: formData.academic.masterDegree || 'Master of Arts (2023)',
      masterPercentage: parseFloat(formData.academic.percentage || 68.5),
      annualFamilyIncome: parseInt(formData.personal.familyIncome || 180000, 10),
      submissionDate: new Date().toISOString().slice(0, 10),
      stage: 'SUBMITTED',
      verificationStatus: 'PENDING',
      eligibilityStatus: 'UNDER_REVIEW',
      assignedOfficer: 'Dr. Arvind Soren',
      assignedDesk: 'Desk 3 (Eastern Zone)',
      urgentAttention: false,
      aiPreScreenScore: 88,
      aiFlags: formData.aiFlags || [],
      documents: formData.uploadedDocuments || [
        {
          id: `doc-${Date.now()}-1`,
          type: 'st_cert',
          title: 'ST Caste Certificate',
          fileName: 'ST_Certificate_Uploaded.pdf',
          fileSize: '1.4 MB',
          uploadDate: new Date().toISOString().slice(0, 10),
          status: 'PENDING',
          aiStatus: 'EXTRACTED_MATCH',
          aiConfidence: 96
        }
      ],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          stage: 'Application Form Submitted',
          timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
          actor: `Applicant (${formData.personal.fullName || 'Rajeshwari Marandi'})`,
          description: `Application ID ${generatedId} successfully registered under ${scheme.name}.`
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    setSelectedAppId(generatedId);
    addAuditLog('SUBMITTED_NEW_APPLICATION', generatedId, 'DRAFT', 'SUBMITTED', `New application filed for ${scheme.id}`);
    return generatedId;
  };

  // Update scheme rule
  const updateSchemeRule = (schemeId, updatedRuleFields) => {
    setSchemes(prev => prev.map(s => {
      if (s.id !== schemeId) return s;
      const updated = {
        ...s,
        rules: { ...s.rules, ...updatedRuleFields }
      };
      addAuditLog('UPDATED_SCHEME_RULES', s.code, 'ACTIVE', 'CONFIGURED', `Updated policy parameters for ${s.name}`);
      return updated;
    }));
  };

  // Reset to default seed data (critical for judge live demo resets)
  const resetToDefaultData = () => {
    setApplications(INITIAL_APPLICATIONS);
    setSchemes(SCHEMES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setSelectedAppId('MOTA-2026-NFST-0101');
    setCurrentRole('student');
    setDemoStep(1);
    localStorage.clear();
  };

  const value = {
    currentRole,
    currentUser,
    switchRole,
    applications,
    schemes,
    auditLogs,
    selectedAppId,
    setSelectedAppId,
    activeApplication,
    raiseDeficiency,
    resolveDeficiency,
    verifyDocument,
    forwardToScrutiny,
    awardScholarship,
    rejectApplication,
    submitNewApplication,
    updateSchemeRule,
    resetToDefaultData,
    demoStep,
    setDemoStep,
    fontScale,
    setFontScale,
    highContrast,
    setHighContrast,
    isDemoGuideOpen,
    setIsDemoGuideOpen
  };

  return (
    <AppContext.Provider value={value}>
      <div style={{ fontSize: `${fontScale * 100}%` }} className={highContrast ? 'contrast-125 saturate-150' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
