-- ==============================================================================
-- MINISTRY OF TRIBAL AFFAIRS, GOVERNMENT OF INDIA
-- Demonstration Seed Dataset for Scheduled Tribe Scholarship & Fellowship System
-- ==============================================================================

USE mota_scholarship_db;

-- 1. SEED SCHEMES
INSERT INTO schemes (id, code, name, hindiName, level, slots, academicYear, minMasterMarks, maxAge, incomeCeiling, maxQsRank, startDate, endDate, correctionDeadline, jrfStipend, srfStipend) VALUES
('NFST', 'MOTA-SCHEME-NFST', 'National Fellowship for Scheduled Tribes (NFST)', 'अनुसूचित जनजातियों के लिए राष्ट्रीय अध्येतावृत्ति', 'M.Phil / Ph.D.', 750, '2026-27', 55.00, 36, 0.00, NULL, '2026-08-01', '2026-10-31', '2026-11-15', '₹31,000 / month', '₹35,000 / month'),
('NOS', 'MOTA-SCHEME-NOS', 'National Overseas Scholarship for ST Candidates (NOS)', 'अनुसूचित जनजाति के छात्रों के लिए राष्ट्रीय विदेशी छात्रवृत्ति', 'Master’s / Ph.D. Abroad', 20, '2026-27', 55.00, 35, 600000.00, 500, '2026-07-15', '2026-10-15', '2026-11-05', '$15,400 / year', '$15,400 / year');

-- 2. SEED USERS
INSERT INTO users (id, name, email, phone, role, designation, department, tribe, state, district) VALUES
('USR-STU-01', 'Rajeshwari Marandi', 'rajeshwari.marandi@demo.gov.in', '+91 94311 82910', 'STUDENT', 'Ph.D. Scholar', 'Dept of Tribal Languages', 'Santhal', 'Jharkhand', 'Ranchi'),
('USR-OFF-03', 'Dr. Arvind Soren', 'arvind.soren@mota.gov.in', '+91 11 2338 0001', 'VERIFICATION_OFFICER', 'Scrutiny Officer - Desk 3', 'Verification Cell, MoTA', 'Santhal', 'Delhi', 'New Delhi'),
('USR-ADM-01', 'Sunita Nayak', 'sunita.nayak@mota.gov.in', '+91 11 2338 0002', 'MINISTRY_ADMIN', 'Joint Secretary / Scheme Director', 'Tribal Higher Education Division', NULL, 'Delhi', 'New Delhi');

-- 3. SEED APPLICATIONS
INSERT INTO applications (id, userId, applicantName, fatherName, dob, gender, tribe, state, district, address, email, phone, schemeId, studyLevel, institution, department, supervisor, researchTopic, qualifyingExam, masterDegree, masterPercentage, annualFamilyIncome, submissionDate, stage, verificationStatus, eligibilityStatus, assignedOfficer, assignedDesk, urgentAttention, aiPreScreenScore) VALUES
('MOTA-2026-NFST-0101', 'USR-STU-01', 'Rajeshwari Marandi', 'Mangal Marandi', '1998-05-14', 'Female', 'Santhal', 'Jharkhand', 'Ranchi', 'Vill: Murhu, Post: Murhu, Khunti, Ranchi - 835216', 'rajeshwari.marandi@demo.gov.in', '+91 94311 82910', 'NFST', 'Ph.D.', 'Ranchi University, Jharkhand', 'Department of Tribal & Regional Languages', 'Prof. B. K. Soy', 'Ethno-linguistic Documentation and Morphosyntax of Santhali Dialects in Chota Nagpur Plateau', 'UGC-NET (June 2024)', 'M.A. Linguistics', 68.40, 180000.00, '2026-09-12', 'DOCUMENT_VERIFICATION', 'DEFICIENCY_RAISED', 'UNDER_REVIEW', 'Dr. Arvind Soren', 'Desk 3 (Eastern Zone)', TRUE, 84),
('MOTA-2026-NOS-0102', NULL, 'Birsa Kispotta', 'Sanjay Kispotta', '1996-11-20', 'Male', 'Oraon', 'Chhattisgarh', 'Raipur', 'Qr. 4B, Sector 7, Naya Raipur - 492018', 'birsa.kispotta@demo.gov.in', '+91 98271 44512', 'NOS', 'Master’s Abroad', 'University of Oxford, UK', 'Dept of Plant Sciences', 'Prof. T. H. Edwards', 'Tropical Agroforestry Resilience and Carbon Sequestration', 'IELTS Academic (8.0)', 'B.Sc. Forestry (Hons)', 74.20, 420000.00, '2026-08-28', 'SCRUTINY', 'VERIFIED', 'ELIGIBLE', 'Dr. Arvind Soren', 'Desk 1 (International Cell)', FALSE, 96),
('MOTA-2026-NOS-0107', NULL, 'Sneha Naik', 'Dhanraj Naik', '1995-04-12', 'Female', 'Naikda', 'Gujarat', 'Dahod', 'Prabhat Nagar, Station Road, Dahod - 389151', 'sneha.naik@demo.gov.in', '+91 98250 88219', 'NOS', 'Master’s Abroad', 'Technical University of Munich (TUM), Germany', 'Dept of Energy Engg', 'Prof. Dr. Klaus Herrmann', 'Decentralized Microgrid Architectures for Forest Settlements', 'TOEFL iBT (106)', 'B.Tech Electrical Engg', 81.00, 350000.00, '2026-06-10', 'AWARDED', 'VERIFIED', 'ELIGIBLE', 'Dr. Arvind Soren', 'Desk 1 (International Cell)', FALSE, 98);
