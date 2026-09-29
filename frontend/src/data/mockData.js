// Realistic demonstration seed data for Ministry of Tribal Affairs (MoTA)
// AI-Enabled Scholarship and Fellowship Management System (SIH 2026)

export const SCHEMES = [
  {
    id: 'NFST',
    code: 'MOTA-SCHEME-NFST',
    name: 'National Fellowship for Scheduled Tribes (NFST)',
    hindiName: 'अनुसूचित जनजातियों के लिए राष्ट्रीय अध्येतावृत्ति',
    level: 'M.Phil / Ph.D.',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    targetAudience: 'ST Students pursuing regular and full-time M.Phil / Ph.D. degrees in Sciences, Humanities, Social Sciences, and Engineering in Indian Universities.',
    slots: 750,
    academicYear: '2026-27',
    applicationWindow: {
      startDate: '2026-08-01',
      endDate: '2026-10-31',
      correctionDeadline: '2026-11-15'
    },
    financialAssistance: {
      jrfStipend: '₹31,000 per month (First 2 years)',
      srfStipend: '₹35,000 per month (Remaining tenure)',
      contingencyHumanities: '₹10,000 per annum',
      contingencyScience: '₹20,500 per annum',
      hra: 'As per central government norms (8% / 16% / 24%)',
      escortsAllowance: '₹2,000 per month for physically handicapped scholars'
    },
    eligibilityOverview: [
      'Candidate must belong to a notified Scheduled Tribe (ST) community.',
      'Must have qualified UGC-NET / CSIR-NET or secured confirmed Ph.D./M.Phil registration in a recognized Indian University/Institute.',
      'No income ceiling under current guidelines (demonstration rule).',
      'Candidate should not be in receipt of any other central/state government fellowship or gainful employment.'
    ],
    rules: {
      minMasterMarks: 55, // 55% for ST
      maxAge: 36, // years (with 5-yr ST relaxation)
      incomeCeiling: 0, // 0 = No ceiling
      requiresNet: true,
      requiresFullTimeAdmission: true
    },
    requiredDocuments: [
      { id: 'st_cert', name: 'ST Caste Certificate', authority: 'Competent Authority (SDO/DM/Tehsildar)', mandatory: true },
      { id: 'master_marks', name: 'Post-Graduation Degree & Marksheet', authority: 'Recognized University', mandatory: true },
      { id: 'admission_letter', name: 'Confirmed Ph.D. Admission / Registration Letter', authority: 'University Registrar', mandatory: true },
      { id: 'synopsis', name: 'Research Proposal / Synopsis', authority: 'Research Supervisor Signature', mandatory: true },
      { id: 'aadhaar', name: 'Aadhaar / Identity Proof', authority: 'UIDAI', mandatory: true },
      { id: 'bank_passbook', name: 'Aadhaar-Seeded Bank Passbook / Cancelled Cheque', authority: 'Public Sector Bank / Scheduled Bank', mandatory: true }
    ],
    disclaimer: 'Illustrative demonstration rules for Smart India Hackathon 2026. Do not represent real-time policy modifications.'
  },
  {
    id: 'NOS',
    code: 'MOTA-SCHEME-NOS',
    name: 'National Overseas Scholarship for ST Candidates (NOS)',
    hindiName: 'अनुसूचित जनजाति के छात्रों के लिए राष्ट्रीय विदेशी छात्रवृत्ति',
    level: 'Master’s / Ph.D. Abroad',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    targetAudience: 'ST Students seeking higher education abroad (Master’s degree or Ph.D.) in accredited foreign institutions ranked in the top 500 QS/Times Higher Education Rankings.',
    slots: 20,
    academicYear: '2026-27',
    applicationWindow: {
      startDate: '2026-07-15',
      endDate: '2026-10-15',
      correctionDeadline: '2026-11-05'
    },
    financialAssistance: {
      annualMaintenanceUS: '$15,400 per annum (USA & other countries)',
      annualMaintenanceUK: '£9,900 per annum (United Kingdom)',
      tuitionFee: 'Actual tuition and compulsory fees paid directly to university',
      contingencyAllowance: '$1,500 / £1,100 per annum for books, equipment, study tours',
      airfare: 'Economy class return airfare by shortest route',
      visaAndInsurance: 'Actual visa fees and mandatory local medical insurance'
    },
    eligibilityOverview: [
      'Candidate must belong to a notified Scheduled Tribe (ST) community.',
      'Unconditional admission offer letter from a top 500 QS-ranked foreign university.',
      'Total family income from all sources must not exceed ₹6,00,000 per annum.',
      'Minimum 55% marks or equivalent grade in qualifying Master’s / Bachelor’s degree.',
      'Candidate age must be below 35 years as of first day of the application year.'
    ],
    rules: {
      minMasterMarks: 55,
      maxAge: 35,
      incomeCeiling: 600000, // ₹6.0 Lakhs
      requiresNet: false,
      requiresForeignAdmission: true,
      maxQsRank: 500
    },
    requiredDocuments: [
      { id: 'st_cert', name: 'ST Caste Certificate', authority: 'Competent Authority (SDO/DM/Tehsildar)', mandatory: true },
      { id: 'income_cert', name: 'Family Income Certificate (Form 16 / Revenue Officer)', authority: 'Revenue Authority / Employer', mandatory: true },
      { id: 'foreign_offer', name: 'Unconditional Admission Offer Letter', authority: 'Foreign University Admissions Office', mandatory: true },
      { id: 'academic_transcript', name: 'Consolidated Academic Transcripts', authority: 'Graduating University', mandatory: true },
      { id: 'passport', name: 'Valid Indian Passport (Front & Back)', authority: 'Ministry of External Affairs, GoI', mandatory: true },
      { id: 'bank_passbook', name: 'Aadhaar-Linked Bank Account Details', authority: 'Scheduled Bank', mandatory: true }
    ],
    disclaimer: 'Illustrative demonstration rules for Smart India Hackathon 2026. Do not represent real-time policy modifications.'
  }
];

export const DEMO_USERS = {
  student: {
    id: 'USR-STU-01',
    name: 'Rajeshwari Marandi',
    role: 'STUDENT',
    email: 'rajeshwari.marandi@demo.gov.in',
    phone: '+91 94311 82910',
    tribe: 'Santhal',
    state: 'Jharkhand',
    district: 'Ranchi',
    associatedAppId: 'MOTA-2026-NFST-0101'
  },
  officer: {
    id: 'USR-OFF-03',
    name: 'Dr. Arvind Soren',
    role: 'VERIFICATION_OFFICER',
    designation: 'Scrutiny Officer - Desk 3',
    department: 'Verification & Scrutiny Cell, MoTA',
    email: 'arvind.soren@mota.gov.in'
  },
  admin: {
    id: 'USR-ADM-01',
    name: 'Sunita Nayak',
    role: 'MINISTRY_ADMIN',
    designation: 'Joint Secretary / Scheme Director',
    department: 'Tribal Higher Education Division, MoTA',
    email: 'sunita.nayak@mota.gov.in'
  }
};

export const INITIAL_APPLICATIONS = [
  {
    id: 'MOTA-2026-NFST-0101',
    applicantName: 'Rajeshwari Marandi',
    fatherName: 'Mangal Marandi',
    dob: '1998-05-14',
    gender: 'Female',
    tribe: 'Santhal',
    state: 'Jharkhand',
    district: 'Ranchi',
    address: 'Vill: Murhu, Post: Murhu, PS: Khunti, Ranchi, Jharkhand - 835216',
    email: 'rajeshwari.marandi@demo.gov.in',
    phone: '+91 94311 82910',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes (NFST)',
    studyLevel: 'Ph.D.',
    institution: 'Ranchi University, Jharkhand',
    department: 'Department of Tribal & Regional Languages',
    supervisor: 'Prof. Birendra Kumar Soy',
    researchTopic: 'Ethno-linguistic Documentation and Morphosyntax of Santhali Dialects in Chota Nagpur Plateau',
    qualifyingExam: 'UGC-NET (June 2024 Qualified)',
    ugcNetRoll: 'JH04001928',
    masterDegree: 'M.A. Linguistics, Ranchi University (2022)',
    masterPercentage: 68.4,
    annualFamilyIncome: 180000,
    submissionDate: '2026-09-12',
    stage: 'DOCUMENT_VERIFICATION', // 'DRAFT' | 'SUBMITTED' | 'DOCUMENT_VERIFICATION' | 'ELIGIBILITY_REVIEW' | 'SCRUTINY' | 'SELECTION' | 'AWARDED' | 'REJECTED'
    verificationStatus: 'DEFICIENCY_RAISED', // 'PENDING' | 'AI_FLAGGED' | 'DEFICIENCY_RAISED' | 'DEFICIENCY_RESOLVED' | 'VERIFIED' | 'REJECTED'
    eligibilityStatus: 'UNDER_REVIEW', // 'PENDING' | 'UNDER_REVIEW' | 'ELIGIBLE' | 'INELIGIBLE'
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 3 (Eastern Zone)',
    urgentAttention: true,
    aiPreScreenScore: 84, // 0 - 100
    aiFlags: [
      {
        field: 'Income Certificate',
        severity: 'HIGH',
        message: 'Uploaded Revenue Officer stamp is blurry and issue date exceeds the 1-year financial year validity.',
        advisory: 'Officer scrutiny required. Issue formal deficiency notice requesting fresh Tahsildar income certificate.'
      }
    ],
    documents: [
      {
        id: 'doc-0101-st',
        type: 'st_cert',
        title: 'ST Caste Certificate',
        fileName: 'ST_Certificate_Rajeshwari_SDO.pdf',
        fileSize: '1.4 MB',
        uploadDate: '2026-09-12',
        status: 'VERIFIED',
        aiStatus: 'EXTRACTED_MATCH',
        aiConfidence: 98,
        extractedData: {
          candidateName: 'Rajeshwari Marandi',
          fatherName: 'Mangal Marandi',
          certificateNo: 'JH/RNC/ST/2021/008492',
          issuingAuthority: 'Sub-Divisional Officer (SDO), Ranchi',
          issueDate: '2021-04-18',
          community: 'Santhal (Notified ST Sr. No. 27)',
          matchScore: 100
        },
        officerRemark: 'Original SDO seal verified and matched with digital repository format.'
      },
      {
        id: 'doc-0101-income',
        type: 'income_cert',
        title: 'Income Certificate',
        fileName: 'Income_Certificate_2023_Old.pdf',
        fileSize: '890 KB',
        uploadDate: '2026-09-12',
        status: 'DEFICIENT',
        aiStatus: 'FLAGGED_BLURRY_OR_EXPIRED',
        aiConfidence: 62,
        extractedData: {
          candidateName: 'Rajeshwari Marandi',
          fatherName: 'Mangal Marandi',
          certificateNo: 'REV/KHT/INC/2023/1102',
          issuingAuthority: 'Circle Officer, Khunti (Seal Faded)',
          issueDate: '2023-02-10 (Expired - Older than FY 2025-26)',
          annualIncome: '₹1,80,000 per annum',
          matchScore: 65
        },
        officerRemark: 'Certificate issued in Feb 2023. Per Scheme guidelines clause 4.2, income certificate must be valid for current FY (2025-26) with clear QR/Seal.'
      },
      {
        id: 'doc-0101-master',
        type: 'master_marks',
        title: 'Post-Graduation Consolidated Marksheet',
        fileName: 'MA_Linguistics_Final_Marksheet.pdf',
        fileSize: '2.1 MB',
        uploadDate: '2026-09-12',
        status: 'VERIFIED',
        aiStatus: 'EXTRACTED_MATCH',
        aiConfidence: 95,
        extractedData: {
          candidateName: 'Rajeshwari Marandi',
          university: 'Ranchi University',
          degree: 'Master of Arts in Linguistics',
          aggregatePercentage: '68.4%',
          division: 'First Class with Distinction',
          passingYear: '2022',
          matchScore: 98
        }
      },
      {
        id: 'doc-0101-admission',
        type: 'admission_letter',
        title: 'Ph.D. Registration / Admission Order',
        fileName: 'PhD_Admission_Order_RanchiUniv.pdf',
        fileSize: '1.2 MB',
        uploadDate: '2026-09-12',
        status: 'VERIFIED',
        aiStatus: 'EXTRACTED_MATCH',
        aiConfidence: 94,
        extractedData: {
          candidateName: 'Rajeshwari Marandi',
          institution: 'Ranchi University',
          registrationNo: 'RU/DOC/LING/2024/048',
          effectiveDate: '2024-01-15',
          courseMode: 'Regular & Full Time',
          matchScore: 96
        }
      },
      {
        id: 'doc-0101-aadhaar',
        type: 'aadhaar',
        title: 'Aadhaar Identity Proof',
        fileName: 'Aadhaar_Masked_UIDAI.pdf',
        fileSize: '650 KB',
        uploadDate: '2026-09-12',
        status: 'VERIFIED',
        aiStatus: 'EXTRACTED_MATCH',
        aiConfidence: 99,
        extractedData: {
          candidateName: 'Rajeshwari Marandi',
          maskedUid: 'XXXXXXXX4891',
          gender: 'Female',
          yob: '1998',
          matchScore: 100
        }
      }
    ],
    deficiency: {
      hasDeficiency: true,
      noticeId: 'DEF-MOTA-2026-0984',
      dateRaised: '2026-09-18',
      deadline: '2026-10-05',
      raisedBy: 'Dr. Arvind Soren',
      category: 'DOCUMENT_DEFECT',
      documentType: 'income_cert',
      officerNote: 'The uploaded Income Certificate was issued in Feb 2023 and the Circle Officer seal is partially obscured. Please upload a fresh Income Certificate for FY 2025-26 issued by an officer not below the rank of Tehsildar / SDO.',
      applicantResponse: null,
      resubmittedDoc: null,
      resolved: false
    },
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-09-12 11:34 AM', actor: 'Applicant (Rajeshwari Marandi)', description: 'Application successfully submitted online with 5 required documents.' },
      { id: 'tl-2', stage: 'AI Document Pre-screening', timestamp: '2026-09-12 11:36 AM', actor: 'Automated AI Extraction Engine', description: 'OCR completed on 5 documents. Advisory alert raised on Income Certificate validity & seal clarity.' },
      { id: 'tl-3', stage: 'Officer Verification', timestamp: '2026-09-18 03:15 PM', actor: 'Dr. Arvind Soren (Desk 3)', description: 'Scrutiny conducted. 4 documents verified. Deficiency Notice DEF-MOTA-2026-0984 raised for Income Certificate.' }
    ]
  },
  {
    id: 'MOTA-2026-NOS-0102',
    applicantName: 'Birsa Kispotta',
    fatherName: 'Sanjay Kispotta',
    dob: '1996-11-20',
    gender: 'Male',
    tribe: 'Oraon',
    state: 'Chhattisgarh',
    district: 'Raipur',
    address: 'Qr. 4B, Sector 7, Naya Raipur, Chhattisgarh - 492018',
    email: 'birsa.kispotta@demo.gov.in',
    phone: '+91 98271 44512',
    schemeId: 'NOS',
    schemeName: 'National Overseas Scholarship for ST Candidates (NOS)',
    studyLevel: 'Master’s Abroad',
    institution: 'University of Oxford, United Kingdom',
    department: 'Department of Plant Sciences & Environmental Change',
    supervisor: 'Prof. Timothy H. Edwards',
    researchTopic: 'Tropical Agroforestry Resilience and Carbon Sequestration in Central Indian Indigenous Habitats',
    qualifyingExam: 'IELTS Academic (Band 8.0)',
    foreignUniversityRank: 3, // QS Rank 3
    masterDegree: 'B.Sc. Forestry (Hons), Indira Gandhi Krishi Vishwavidyalaya (2021)',
    masterPercentage: 74.2,
    annualFamilyIncome: 420000, // Within ₹6.0L ceiling
    submissionDate: '2026-08-28',
    stage: 'SCRUTINY',
    verificationStatus: 'VERIFIED',
    eligibilityStatus: 'ELIGIBLE',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 1 (International Cell)',
    urgentAttention: false,
    aiPreScreenScore: 96,
    aiFlags: [],
    documents: [
      { id: 'doc-0102-st', type: 'st_cert', title: 'ST Caste Certificate', fileName: 'ST_Certificate_Birsa_SDO_Raipur.pdf', fileSize: '1.6 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 99 },
      { id: 'doc-0102-income', type: 'income_cert', title: 'Income Certificate', fileName: 'Income_Certificate_FY2526_Tehsildar.pdf', fileSize: '1.1 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 97 },
      { id: 'doc-0102-offer', type: 'foreign_offer', title: 'Unconditional Admission Offer Letter', fileName: 'Oxford_Unconditional_Offer_MSc_Env.pdf', fileSize: '2.4 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 95 },
      { id: 'doc-0102-passport', type: 'passport', title: 'Passport Copy', fileName: 'Indian_Passport_Birsa_Valid2031.pdf', fileSize: '1.8 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 98 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-08-28 09:12 AM', actor: 'Applicant', description: 'Application submitted for NOS 2026-27 cohort.' },
      { id: 'tl-2', stage: 'Document Verification', timestamp: '2026-09-02 02:40 PM', actor: 'Dr. Arvind Soren', description: 'All mandatory credentials verified with 100% compliance.' },
      { id: 'tl-3', stage: 'Eligibility Clearance', timestamp: '2026-09-05 11:20 AM', actor: 'Scrutiny Committee', description: 'Confirmed QS Rank #3, family income ₹4.20L below ceiling. Forwarded for final merit selection.' }
    ]
  },
  {
    id: 'MOTA-2026-NFST-0103',
    applicantName: 'Mangal Singh Munda',
    fatherName: 'Dukhia Munda',
    dob: '1997-03-08',
    gender: 'Male',
    tribe: 'Munda',
    state: 'Jharkhand',
    district: 'Khunti',
    address: 'At/PO: Torpa, Khunti, Jharkhand - 835227',
    email: 'mangal.munda@demo.gov.in',
    phone: '+91 97712 30198',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes (NFST)',
    studyLevel: 'Ph.D.',
    institution: 'IIT Kharagpur, West Bengal',
    department: 'Department of Metallurgical and Materials Engineering',
    supervisor: 'Dr. Debabrata Roy',
    researchTopic: 'Extraction of Strategic Rare-Earth Elements from Secondary Acid Mine Drainage Tailings',
    qualifyingExam: 'GATE Metallurgy 2023 (Rank 184)',
    masterDegree: 'M.Tech Materials Engg, NIT Jamshedpur (2023)',
    masterPercentage: 79.5,
    annualFamilyIncome: 240000,
    submissionDate: '2026-09-05',
    stage: 'ELIGIBILITY_REVIEW',
    verificationStatus: 'VERIFIED',
    eligibilityStatus: 'UNDER_REVIEW',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 3 (Eastern Zone)',
    urgentAttention: false,
    aiPreScreenScore: 94,
    aiFlags: [],
    documents: [
      { id: 'doc-0103-st', type: 'st_cert', title: 'ST Certificate', fileName: 'ST_Cert_Munda_Khunti.pdf', fileSize: '1.2 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 98 },
      { id: 'doc-0103-master', type: 'master_marks', title: 'M.Tech Degree Certificate', fileName: 'NIT_JSR_Degree_MTech.pdf', fileSize: '2.0 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 96 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-09-05 04:15 PM', actor: 'Applicant', description: 'Application filed with complete GATE scorecard and M.Tech credentials.' },
      { id: 'tl-2', stage: 'Document Verification', timestamp: '2026-09-14 10:30 AM', actor: 'Dr. Arvind Soren', description: 'Documents verified. Eligibility criteria under checklist review.' }
    ]
  },
  {
    id: 'MOTA-2026-NFST-0104',
    applicantName: 'Jampa Dorjee Bhotia',
    fatherName: 'Tenzing Bhotia',
    dob: '1999-07-22',
    gender: 'Male',
    tribe: 'Bhotia',
    state: 'Sikkim',
    district: 'Gangtok',
    address: 'Upper Syari, Deorali, Gangtok, East Sikkim - 737102',
    email: 'jampa.bhotia@demo.gov.in',
    phone: '+91 98320 11487',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes (NFST)',
    studyLevel: 'Ph.D.',
    institution: 'University of Delhi, Delhi',
    department: 'Department of Botany',
    supervisor: 'Prof. Sudeshna Majumdar',
    researchTopic: 'Phytochemical and Molecular Profiling of Threatened Alpine Medicinal Herbs in Eastern Himalayas',
    qualifyingExam: 'CSIR-UGC NET (Life Sciences 2024)',
    masterDegree: 'M.Sc. Botany, Sikkim University (2023)',
    masterPercentage: 71.8,
    annualFamilyIncome: 310000,
    submissionDate: '2026-09-10',
    stage: 'DOCUMENT_VERIFICATION',
    verificationStatus: 'AI_FLAGGED',
    eligibilityStatus: 'UNDER_REVIEW',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 4 (North-Eastern Zone)',
    urgentAttention: true,
    aiPreScreenScore: 78,
    aiFlags: [
      {
        field: 'Candidate Name',
        severity: 'MEDIUM',
        message: 'Name Mismatch: Application form states "Jampa Dorjee Bhotia", while ST Certificate reads "Jampa D. Bhotia".',
        advisory: 'Discrepancy in middle name expansion. Officer verification or affidavit / matriculation certificate cross-check recommended.'
      }
    ],
    documents: [
      { id: 'doc-0104-st', type: 'st_cert', title: 'ST Certificate', fileName: 'ST_Sikkim_Bhotia_Jampa.pdf', fileSize: '1.5 MB', status: 'UNDER_REVIEW', aiStatus: 'FLAGGED_MISMATCH', aiConfidence: 78 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-09-10 01:20 PM', actor: 'Applicant', description: 'Application submitted.' },
      { id: 'tl-2', stage: 'AI Document Pre-screening', timestamp: '2026-09-10 01:22 PM', actor: 'AI Engine', description: 'Advisory flag raised: Name discrepancy between form and caste certificate.' }
    ]
  },
  {
    id: 'MOTA-2026-NOS-0105',
    applicantName: 'Shanti Boro',
    fatherName: 'Baneswar Boro',
    dob: '1997-01-14',
    gender: 'Female',
    tribe: 'Bodo',
    state: 'Assam',
    district: 'Kokrajhar',
    address: 'Boro Bhatarmari, Ward No 4, Kokrajhar, Assam - 783370',
    email: 'shanti.boro@demo.gov.in',
    phone: '+91 97061 99234',
    schemeId: 'NOS',
    schemeName: 'National Overseas Scholarship for ST Candidates (NOS)',
    studyLevel: 'Ph.D. Abroad',
    institution: 'University of Melbourne, Australia',
    department: 'School of Population and Global Health',
    supervisor: 'Prof. Alistair Jenkins',
    researchTopic: 'Epidemiology of Vector-Borne Diseases in Flood-Prone Indigenous Riverine Ecosystems',
    qualifyingExam: 'PTE Academic (Score: 78)',
    foreignUniversityRank: 14,
    masterDegree: 'Master of Public Health, TISS Guwahati (2022)',
    masterPercentage: 69.8,
    annualFamilyIncome: 380000,
    submissionDate: '2026-09-15',
    stage: 'DOCUMENT_VERIFICATION',
    verificationStatus: 'DEFICIENCY_RAISED',
    eligibilityStatus: 'UNDER_REVIEW',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 1 (International Cell)',
    urgentAttention: true,
    aiPreScreenScore: 70,
    aiFlags: [
      {
        field: 'Admission Letter',
        severity: 'HIGH',
        message: 'Conditional offer letter uploaded instead of mandatory unconditional admission offer.',
        advisory: 'NOS guidelines mandate unconditional offer letter. Request clarification or official fee waiver confirmation.'
      }
    ],
    deficiency: {
      hasDeficiency: true,
      noticeId: 'DEF-MOTA-2026-1011',
      dateRaised: '2026-09-20',
      deadline: '2026-10-10',
      raisedBy: 'Dr. Arvind Soren',
      category: 'INCOMPLETE_ADMISSION_OFFER',
      documentType: 'foreign_offer',
      officerNote: 'Uploaded letter contains condition clause regarding international student health cover. Please upload an Unconditional Offer Letter from the University of Melbourne admissions office.',
      applicantResponse: null,
      resubmittedDoc: null,
      resolved: false
    },
    documents: [
      { id: 'doc-0105-offer', type: 'foreign_offer', title: 'University Offer Letter', fileName: 'Melbourne_Conditional_Offer_Letter.pdf', fileSize: '1.9 MB', status: 'DEFICIENT', aiStatus: 'FLAGGED_MISMATCH', aiConfidence: 74 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-09-15 05:40 PM', actor: 'Applicant', description: 'Application filed for NOS Scheme.' },
      { id: 'tl-2', stage: 'Deficiency Raised', timestamp: '2026-09-20 04:10 PM', actor: 'Dr. Arvind Soren', description: 'Deficiency notice issued regarding conditional admission terms.' }
    ]
  },
  {
    id: 'MOTA-2026-NFST-0106',
    applicantName: 'Arjun Gond',
    fatherName: 'Ramcharan Gond',
    dob: '1998-09-30',
    gender: 'Male',
    tribe: 'Gond',
    state: 'Madhya Pradesh',
    district: 'Mandla',
    address: 'Gram: Bichhiya, Tehsil: Bichhiya, Mandla, MP - 481995',
    email: 'arjun.gond@demo.gov.in',
    phone: '+91 94251 77312',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes (NFST)',
    studyLevel: 'Ph.D.',
    institution: 'Banaras Hindu University (BHU), Varanasi, UP',
    department: 'Department of Ancient Indian History, Culture and Archaeology',
    supervisor: 'Prof. Om Prakash Pandey',
    researchTopic: 'Rock Art Tradition and Megalithic Burial Practices of Gondwana: An Archaeological Survey',
    qualifyingExam: 'UGC-NET (History 2023)',
    masterDegree: 'M.A. AIHC & Archaeology, BHU (2023)',
    masterPercentage: 66.2,
    annualFamilyIncome: 140000,
    submissionDate: '2026-09-16',
    stage: 'DOCUMENT_VERIFICATION',
    verificationStatus: 'PENDING',
    eligibilityStatus: 'UNDER_REVIEW',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 2 (Central Zone)',
    urgentAttention: false,
    aiPreScreenScore: 92,
    aiFlags: [],
    documents: [
      { id: 'doc-0106-st', type: 'st_cert', title: 'ST Certificate', fileName: 'Gond_Caste_Certificate_Mandla_Tehsildar.pdf', fileSize: '1.3 MB', status: 'PENDING', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 96 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-09-16 10:15 AM', actor: 'Applicant', description: 'Application submitted. Queue position #218.' }
    ]
  },
  {
    id: 'MOTA-2026-NOS-0107',
    applicantName: 'Sneha Naik',
    fatherName: 'Dhanraj Naik',
    dob: '1995-04-12',
    gender: 'Female',
    tribe: 'Naikda',
    state: 'Gujarat',
    district: 'Dahod',
    address: 'Prabhat Nagar, Station Road, Dahod, Gujarat - 389151',
    email: 'sneha.naik@demo.gov.in',
    phone: '+91 98250 88219',
    schemeId: 'NOS',
    schemeName: 'National Overseas Scholarship for ST Candidates (NOS)',
    studyLevel: 'Master’s Abroad',
    institution: 'Technical University of Munich (TUM), Germany',
    department: 'Department of Energy and Process Engineering',
    supervisor: 'Prof. Dr. Klaus Herrmann',
    researchTopic: 'Decentralized Microgrid Architectures and Battery Storage Optimization for Remote Forest Settlements',
    qualifyingExam: 'TOEFL iBT (106/120)',
    foreignUniversityRank: 37,
    masterDegree: 'B.Tech Electrical Engg, SVNIT Surat (2020)',
    masterPercentage: 81.0,
    annualFamilyIncome: 350000,
    submissionDate: '2026-06-10',
    stage: 'AWARDED',
    verificationStatus: 'VERIFIED',
    eligibilityStatus: 'ELIGIBLE',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 1 (International Cell)',
    urgentAttention: false,
    aiPreScreenScore: 98,
    aiFlags: [],
    awardDetails: {
      sanctionNumber: 'MOTA/NOS/2026/AW-0042',
      sanctionDate: '2026-08-15',
      sanctionedBy: 'Sunita Nayak, Joint Secretary (MoTA)',
      awardedDurationYears: 2,
      annualAllowanceEuro: '€14,800/yr',
      tuitionFeeCovered: '100% University Fees Exempt/Paid',
      pfmsDbtLinked: true,
      bankAccountMasked: 'HDFC Bank - A/C XXXXXXXX9012 (Aadhaar Seeded)',
      disbursementHistory: [
        { installment: 'Installment 1 (Q1)', amount: '€3,700 (₹3,32,000)', date: '2026-09-01', status: 'DISBURSED', utr: 'RBI-PFMS-20260901-7789' },
        { installment: 'Installment 2 (Q2)', amount: '€3,700 (₹3,32,000)', date: '2026-12-01', status: 'SCHEDULED', utr: '-' }
      ]
    },
    documents: [
      { id: 'doc-0107-st', type: 'st_cert', title: 'ST Certificate', fileName: 'ST_Certificate_Naikda_Dahod.pdf', fileSize: '1.4 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 99 },
      { id: 'doc-0107-tum', type: 'foreign_offer', title: 'TUM Admission Letter', fileName: 'TUM_Official_Admission_Order.pdf', fileSize: '2.8 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 97 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-06-10 11:00 AM', actor: 'Applicant', description: 'Application filed.' },
      { id: 'tl-2', stage: 'Scrutiny Cleared', timestamp: '2026-07-20 03:00 PM', actor: 'Committee', description: 'Recommended by Central Selection Committee.' },
      { id: 'tl-3', stage: 'Sanction Order Issued', timestamp: '2026-08-15 10:00 AM', actor: 'MoTA HQ', description: 'Sanction Order MOTA/NOS/2026/AW-0042 signed. DBT Stage 1 credited.' }
    ]
  },
  {
    id: 'MOTA-2026-NFST-0108',
    applicantName: 'Ramu Rathwa',
    fatherName: 'Gopal Rathwa',
    dob: '1999-02-18',
    gender: 'Male',
    tribe: 'Rathawa',
    state: 'Gujarat',
    district: 'Chhota Udaipur',
    address: 'Post: Kawant, Chhota Udaipur, Gujarat - 391170',
    email: 'ramu.rathwa@demo.gov.in',
    phone: '+91 99042 33189',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes (NFST)',
    studyLevel: 'Ph.D.',
    institution: 'Gujarat University, Ahmedabad',
    department: 'Department of Sociology',
    supervisor: 'Dr. Meena Patel',
    researchTopic: 'Social Ecology and Customary Land Rights of Rathwa Community in Eastern Gujarat',
    qualifyingExam: 'Gujarat SLET (2023)',
    masterDegree: 'M.A. Sociology, MSU Baroda (2022)',
    masterPercentage: 59.2,
    annualFamilyIncome: 160000,
    submissionDate: '2026-09-18',
    stage: 'ELIGIBILITY_REVIEW',
    verificationStatus: 'DEFICIENCY_RAISED',
    eligibilityStatus: 'UNDER_REVIEW',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 2 (Western Zone)',
    urgentAttention: true,
    aiPreScreenScore: 68,
    aiFlags: [
      {
        field: 'Eligibility Questionnaire',
        severity: 'MEDIUM',
        message: 'Questionnaire section on current gainful employment left unanswered.',
        advisory: 'Require non-employment declaration as per fellowship guidelines Clause 6.'
      }
    ],
    documents: [
      { id: 'doc-0108-st', type: 'st_cert', title: 'ST Certificate', fileName: 'ST_Certificate_Rathwa_Kawant.pdf', fileSize: '1.2 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 96 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-09-18 02:40 PM', actor: 'Applicant', description: 'Application filed.' }
    ]
  },
  {
    id: 'MOTA-2026-NFST-0109',
    applicantName: 'Sunita Mina',
    fatherName: 'Kailash Chand Mina',
    dob: '1997-08-05',
    gender: 'Female',
    tribe: 'Meena',
    state: 'Rajasthan',
    district: 'Sawai Madhopur',
    address: 'Kalyan Ji Ki Gali, Bamanwas, Sawai Madhopur, Rajasthan - 322211',
    email: 'sunita.mina@demo.gov.in',
    phone: '+91 94140 66201',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes (NFST)',
    studyLevel: 'Ph.D.',
    institution: 'Jawaharlal Nehru University (JNU), New Delhi',
    department: 'School of International Studies (SIS)',
    supervisor: 'Prof. Ajay Kumar Dubey',
    researchTopic: 'India-Africa South-South Cooperation in Agricultural Technology Transfer and Food Security',
    qualifyingExam: 'UGC-JRF (December 2023)',
    masterDegree: 'M.A. International Relations, JNU (2022)',
    masterPercentage: 76.5,
    annualFamilyIncome: 290000,
    submissionDate: '2026-08-14',
    stage: 'SELECTION',
    verificationStatus: 'VERIFIED',
    eligibilityStatus: 'ELIGIBLE',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 5 (Northern Zone)',
    urgentAttention: false,
    aiPreScreenScore: 97,
    aiFlags: [],
    documents: [
      { id: 'doc-0109-st', type: 'st_cert', title: 'ST Certificate', fileName: 'Mina_ST_Certificate_Rajasthan.pdf', fileSize: '1.5 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 99 },
      { id: 'doc-0109-jrf', type: 'admission_letter', title: 'UGC JRF Award Letter & JNU Registration', fileName: 'JNU_PhD_Admission_Letter_Sunita.pdf', fileSize: '2.1 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 98 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-08-14 09:45 AM', actor: 'Applicant', description: 'Application filed with top UGC-JRF score.' },
      { id: 'tl-2', stage: 'Scrutiny Committee Approval', timestamp: '2026-09-08 04:00 PM', actor: 'Scrutiny Cell', description: 'Recommended for 2026-27 Award list under Rank #12.' }
    ]
  },
  {
    id: 'MOTA-2026-NOS-0110',
    applicantName: 'David Lalnuntluanga',
    fatherName: 'Lalmuanpuia',
    dob: '1996-03-25',
    gender: 'Male',
    tribe: 'Mizo',
    state: 'Mizoram',
    district: 'Aizawl',
    address: 'Khatla South, Aizawl, Mizoram - 796001',
    email: 'david.mizo@demo.gov.in',
    phone: '+91 98623 44091',
    schemeId: 'NOS',
    schemeName: 'National Overseas Scholarship for ST Candidates (NOS)',
    studyLevel: 'Master’s Abroad',
    institution: 'Imperial College London, United Kingdom',
    department: 'Department of Computing',
    supervisor: 'Dr. Sophia Tsoka',
    researchTopic: 'Graph Neural Networks for Rare Genomic Disease Phenotyping in Under-represented Populations',
    qualifyingExam: 'IELTS Academic (Band 7.5)',
    foreignUniversityRank: 6, // QS Rank 6
    masterDegree: 'B.Tech Computer Science, NIT Silchar (2021)',
    masterPercentage: 77.0,
    annualFamilyIncome: 640000, // Marginally exceeds ₹6.0L ceiling!
    submissionDate: '2026-09-02',
    stage: 'DOCUMENT_VERIFICATION',
    verificationStatus: 'DEFICIENCY_RAISED',
    eligibilityStatus: 'UNDER_REVIEW',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 1 (International Cell)',
    urgentAttention: true,
    aiPreScreenScore: 81,
    aiFlags: [
      {
        field: 'Annual Family Income',
        severity: 'HIGH',
        message: 'Income on submitted Form 16 reflects ₹6,40,000, exceeding the statutory ₹6,00,000 ceiling by ₹40,000.',
        advisory: 'Advisory Rule Violation: Exceeds income limit. Candidate may submit certified calculation excluding non-taxable allowances or father’s pension deduction.'
      }
    ],
    deficiency: {
      hasDeficiency: true,
      noticeId: 'DEF-MOTA-2026-1045',
      dateRaised: '2026-09-15',
      deadline: '2026-10-02',
      raisedBy: 'Dr. Arvind Soren',
      category: 'INCOME_CEILING_EXCEEDED',
      documentType: 'income_cert',
      officerNote: 'The gross salary shown on Form 16 is ₹6.40 Lakhs. Per NOS guidelines Clause 3(b), total family income must be below ₹6.00 Lakhs. Please provide competent authority revenue certificate or clarified IT return computation.',
      applicantResponse: null,
      resubmittedDoc: null,
      resolved: false
    },
    documents: [
      { id: 'doc-0110-st', type: 'st_cert', title: 'ST Certificate', fileName: 'ST_Certificate_Mizoram_DC_Aizawl.pdf', fileSize: '1.1 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 99 },
      { id: 'doc-0110-income', type: 'income_cert', title: 'Income Tax Return / Form 16', fileName: 'ITR_V_AY202526_David_Father.pdf', fileSize: '1.4 MB', status: 'DEFICIENT', aiStatus: 'FLAGGED_MISMATCH', aiConfidence: 81 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-09-02 11:20 AM', actor: 'Applicant', description: 'Application filed.' },
      { id: 'tl-2', stage: 'Deficiency Raised', timestamp: '2026-09-15 02:15 PM', actor: 'Dr. Arvind Soren', description: 'Deficiency notice DEF-MOTA-2026-1045 sent for income ceiling compliance.' }
    ]
  },
  {
    id: 'MOTA-2026-NFST-0111',
    applicantName: 'Laxmi Priya Majhi',
    fatherName: 'Rabindra Majhi',
    dob: '1998-10-10',
    gender: 'Female',
    tribe: 'Santhal',
    state: 'Odisha',
    district: 'Mayurbhanj',
    address: 'At: Baripada, Ward No 9, Mayurbhanj, Odisha - 757001',
    email: 'laxmi.majhi@demo.gov.in',
    phone: '+91 94372 55104',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes (NFST)',
    studyLevel: 'Ph.D.',
    institution: 'Utkal University, Bhubaneswar, Odisha',
    department: 'Department of Chemistry',
    supervisor: 'Prof. Satyajit Tripathy',
    researchTopic: 'Green Synthesis of Bimetallic Nanocatalysts for Wastewater Treatment and Heavy Metal Remediation',
    qualifyingExam: 'CSIR-NET JRF (June 2024)',
    masterDegree: 'M.Sc. Analytical Chemistry, Ravenshaw University (2023)',
    masterPercentage: 78.4,
    annualFamilyIncome: 120000,
    submissionDate: '2026-08-20',
    stage: 'SCRUTINY',
    verificationStatus: 'VERIFIED',
    eligibilityStatus: 'ELIGIBLE',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 3 (Eastern Zone)',
    urgentAttention: false,
    aiPreScreenScore: 99,
    aiFlags: [],
    documents: [
      { id: 'doc-0111-st', type: 'st_cert', title: 'ST Certificate', fileName: 'ST_Certificate_Mayurbhanj_Tahasildar.pdf', fileSize: '1.3 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 100 },
      { id: 'doc-0111-chem', type: 'master_marks', title: 'M.Sc. Marksheet & Certificate', fileName: 'Ravenshaw_MSc_Chemistry_Degree.pdf', fileSize: '1.9 MB', status: 'VERIFIED', aiStatus: 'EXTRACTED_MATCH', aiConfidence: 99 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-08-20 02:00 PM', actor: 'Applicant', description: 'Application filed.' },
      { id: 'tl-2', stage: 'Verification Completed', timestamp: '2026-08-26 11:30 AM', actor: 'Dr. Arvind Soren', description: 'All credentials cleared without any discrepancy.' }
    ]
  },
  {
    id: 'MOTA-2026-NFST-0112',
    applicantName: 'Chetan Bhil',
    fatherName: 'Mohan Lal Bhil',
    dob: '1999-04-03',
    gender: 'Male',
    tribe: 'Bhil',
    state: 'Rajasthan',
    district: 'Banswara',
    address: 'Gram Panchayat: Kushalgarh, Banswara, Rajasthan - 327801',
    email: 'chetan.bhil@demo.gov.in',
    phone: '+91 94133 77890',
    schemeId: 'NFST',
    schemeName: 'National Fellowship for Scheduled Tribes (NFST)',
    studyLevel: 'Ph.D.',
    institution: 'Mohanlal Sukhadia University, Udaipur',
    department: 'Department of Geography',
    supervisor: 'Dr. Rajesh Sharma',
    researchTopic: 'Spatial Analysis of Drought Vulnerability and Indigenous Water Harvesting Systems in Southern Rajasthan',
    qualifyingExam: 'UGC-NET (Geography 2024)',
    masterDegree: 'M.A. Geography, MLSU Udaipur (2023)',
    masterPercentage: 62.0,
    annualFamilyIncome: 110000,
    submissionDate: '2026-09-17',
    stage: 'DOCUMENT_VERIFICATION',
    verificationStatus: 'AI_FLAGGED',
    eligibilityStatus: 'UNDER_REVIEW',
    assignedOfficer: 'Dr. Arvind Soren',
    assignedDesk: 'Desk 5 (Northern Zone)',
    urgentAttention: true,
    aiPreScreenScore: 73,
    aiFlags: [
      {
        field: 'ST Caste Certificate',
        severity: 'HIGH',
        message: 'Document scan illegible: Seal of Sub-Divisional Magistrate is heavily blurred (< 150 DPI resolution).',
        advisory: 'Advisory Rule: Cannot verify seal authenticity. Request high-resolution re-scan or DigiLocker certified copy.'
      }
    ],
    documents: [
      { id: 'doc-0112-st', type: 'st_cert', title: 'ST Certificate', fileName: 'ST_Certificate_Banswara_BlurryScan.pdf', fileSize: '420 KB', status: 'UNDER_REVIEW', aiStatus: 'FLAGGED_BLURRY_OR_EXPIRED', aiConfidence: 58 }
    ],
    timeline: [
      { id: 'tl-1', stage: 'Application Submitted', timestamp: '2026-09-17 06:10 PM', actor: 'Applicant', description: 'Application filed.' },
      { id: 'tl-2', stage: 'AI Document Pre-screening', timestamp: '2026-09-17 06:12 PM', actor: 'AI Engine', description: 'Low scan resolution flagged on ST Certificate.' }
    ]
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUDIT-8910',
    timestamp: '2026-09-29 16:45:22',
    user: 'Dr. Arvind Soren (Verification Officer)',
    action: 'RAISED_DEFICIENCY',
    appId: 'MOTA-2026-NFST-0101',
    prevStatus: 'UNDER_REVIEW',
    newStatus: 'DEFICIENCY_RAISED',
    remarks: 'Expired income certificate FY 2023 flagged. Fresh FY 2025-26 certificate requested from Tahsildar.'
  },
  {
    id: 'AUDIT-8909',
    timestamp: '2026-09-29 15:20:10',
    user: 'Sunita Nayak (Joint Secretary / Admin)',
    action: 'UPDATED_SCHEME_RULES',
    appId: 'MOTA-SCHEME-NOS',
    prevStatus: 'INCOME_CEILING_500000',
    newStatus: 'INCOME_CEILING_600000',
    remarks: 'Demonstration rule updated: Annual family income ceiling revised from ₹5.0L to ₹6.0L.'
  },
  {
    id: 'AUDIT-8908',
    timestamp: '2026-09-28 11:14:05',
    user: 'Dr. Arvind Soren (Verification Officer)',
    action: 'VERIFIED_DOCUMENT',
    appId: 'MOTA-2026-NOS-0102',
    prevStatus: 'DOCUMENT_VERIFICATION',
    newStatus: 'SCRUTINY',
    remarks: 'Oxford University unconditional offer and IELTS 8.0 verified with zero defects.'
  },
  {
    id: 'AUDIT-8907',
    timestamp: '2026-09-27 14:05:49',
    user: 'Sunita Nayak (Joint Secretary / Admin)',
    action: 'SANCTION_APPROVED',
    appId: 'MOTA-2026-NOS-0107',
    prevStatus: 'SCRUTINY',
    newStatus: 'AWARDED',
    remarks: 'Sanction Order MOTA/NOS/2026/AW-0042 signed. TUM Germany cohort 2026-27 DBT authorized.'
  }
];

export const SAMPLE_OCR_PRESETS = [
  {
    id: 'sample-clean-st',
    name: 'Sample Clear ST Certificate (Santhal, Jharkhand)',
    file: 'ST_Certificate_Santhal_Clear_Sample.pdf',
    type: 'st_cert',
    confidence: 99,
    status: 'COMPLETE',
    extracted: {
      applicantName: 'Rajeshwari Marandi',
      fatherName: 'Mangal Marandi',
      certificateNo: 'JH/RNC/ST/2021/008492',
      issuingAuthority: 'Sub-Divisional Officer (SDO), Ranchi',
      issueDate: '2021-04-18',
      community: 'Santhal',
      state: 'Jharkhand'
    },
    quality: {
      resolutionDpi: 300,
      blurScore: '0.04 (Sharp)',
      tamperFlag: 'None Detected',
      sealDetected: 'Official SDO Ashoka Emblem Seal Found'
    },
    rules: [
      { check: 'Issuing authority matches designated competent authority list', passed: true },
      { check: 'Applicant name matches application form exactly', passed: true },
      { check: 'Community recognized in President ST List for Jharkhand', passed: true }
    ]
  },
  {
    id: 'sample-name-mismatch',
    name: 'Sample ST Certificate with Name Mismatch',
    file: 'ST_Certificate_Jampa_Mismatch_Sample.pdf',
    type: 'st_cert',
    confidence: 76,
    status: 'MISMATCH',
    extracted: {
      applicantName: 'Jampa D. Bhotia',
      fatherName: 'Tenzing Bhotia',
      certificateNo: 'SK/GTK/ST/2022/00318',
      issuingAuthority: 'District Magistrate, Gangtok, Sikkim',
      issueDate: '2022-08-11',
      community: 'Bhotia',
      state: 'Sikkim'
    },
    quality: {
      resolutionDpi: 240,
      blurScore: '0.08 (Acceptable)',
      tamperFlag: 'None Detected',
      sealDetected: 'Official DM Seal Found'
    },
    rules: [
      { check: 'Issuing authority matches designated competent authority list', passed: true },
      { check: 'Applicant name matches application form exactly', passed: false, warning: 'Mismatch: "Jampa D. Bhotia" vs "Jampa Dorjee Bhotia"' },
      { check: 'Community recognized in President ST List for Sikkim', passed: true }
    ]
  },
  {
    id: 'sample-expired-income',
    name: 'Sample Expired / Low-Resolution Income Certificate',
    file: 'Income_Certificate_Expired_Blurry_Sample.pdf',
    type: 'income_cert',
    confidence: 58,
    status: 'DEFICIENT',
    extracted: {
      applicantName: 'Rajeshwari Marandi',
      fatherName: 'Mangal Marandi',
      certificateNo: 'REV/KHT/INC/2023/1102',
      issuingAuthority: 'Circle Officer, Khunti (Faded Seal)',
      issueDate: '2023-02-10',
      annualIncome: '₹1,80,000 per annum',
      state: 'Jharkhand'
    },
    quality: {
      resolutionDpi: 110,
      blurScore: '0.42 (High Blur)',
      tamperFlag: 'Digital Artifacts Detected around Date',
      sealDetected: 'Partial / Indistinct Stamp'
    },
    rules: [
      { check: 'Certificate valid for current Financial Year (2025-26)', passed: false, warning: 'Issued in FY 2022-23 (Expired)' },
      { check: 'Official stamp and signature clearly legible', passed: false, warning: 'Seal blurred below required 200 DPI threshold' },
      { check: 'Annual family income under ceiling (₹6.0L)', passed: true }
    ]
  },
  {
    id: 'sample-corrected-income',
    name: 'Fresh Corrected FY 2025-26 Income Certificate (Digital Tehsildar Copy)',
    file: 'Income_Certificate_Fresh_FY2526_Verified.pdf',
    type: 'income_cert',
    confidence: 98,
    status: 'COMPLETE',
    extracted: {
      applicantName: 'Rajeshwari Marandi',
      fatherName: 'Mangal Marandi',
      certificateNo: 'JH/RNC/INC/2026/049182',
      issuingAuthority: 'Tahsildar & Executive Magistrate, Ranchi',
      issueDate: '2026-09-25',
      annualIncome: '₹1,80,000 per annum',
      validity: 'Valid for Financial Year 2025-2026',
      state: 'Jharkhand'
    },
    quality: {
      resolutionDpi: 350,
      blurScore: '0.02 (Crisp)',
      tamperFlag: 'Digitally Signed with Valid GoI Public Key',
      sealDetected: 'Govt. of Jharkhand e-District QR & Official Seal'
    },
    rules: [
      { check: 'Certificate valid for current Financial Year (2025-26)', passed: true },
      { check: 'Official stamp and digital signature verified', passed: true },
      { check: 'Annual family income under ceiling (₹6.0L)', passed: true }
    ]
  }
];
