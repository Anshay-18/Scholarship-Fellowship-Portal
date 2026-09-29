# Walkthrough: AI-Enabled Scholarship & Fellowship Management System (MoTA)
### Smart India Hackathon 2026 Prototype • Ministry of Tribal Affairs, Government of India

We have built, verified, and delivered a complete, responsive web prototype for the Ministry of Tribal Affairs (MoTA), Government of India, addressing the Smart India Hackathon 2026 problem statement: **“AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes”**.

---

## 🏛️ Authentic Indian Government Visual Identity

The interface adheres strictly to National Portal of India, NIC, and GIGW 3.0 accessibility standards:
- **Restrained Institutional Palette**: Deep institutional navy (`#0F2537` / `#1A365D`) for top navigation and headers, clean slate-50/100 backgrounds, subtle borders (`border-slate-200`), and restrained shadows.
- **Bilingual Institutional Header**: *जनजातीय कार्य मंत्रालय, भारत सरकार* | *Government of India*.
- **Accessibility Tools**: Top utility strip with font size adjustments (`A-`, `A`, `A+`), High Contrast mode, and screen reader access indicators.
- **Demonstration Labeling**: Clear badges indicating *“PROTOTYPE / DEMONSTRATION ENVIRONMENT”* and explicit notices that all scheme figures and OCR extractions are illustrative demonstration data.
- **State Badges**: Muted teal/emerald for verified states, amber for attention/pending, and rose only for deficiencies or errors.

---

## 👥 Portals & Persona Switching

The application provides instantaneous, zero-friction role switching across 3 key stakeholders via the top bar and dedicated **Role Selection Modal**:
1. **Student / Applicant Portal**: Logged in as **Rajeshwari Marandi** (Santhal Tribe, Ph.D. Scholar in Linguistics, Ranchi University).
2. **Verification Officer Portal**: Logged in as **Dr. Arvind Soren** (Scrutiny Officer - Desk 3, Eastern Zone).
3. **Ministry Administrator Portal**: Logged in as **Sunita Nayak** (Joint Secretary / Scheme Director, MoTA).

State changes (such as uploading corrected documents or marking credentials verified) persist seamlessly across role switches using a reactive synchronized store.

---

## 📦 What Was Built

### 1. Student / Applicant Portal
- **Applicant Dashboard**:
  - Welcome banner with applicant tribal community and domicile.
  - Active application card (`MOTA-2026-NFST-0101`).
  - **7-Stage Visual Progress Tracker**: `Draft → Submitted → Document Verification → Eligibility Review → Scrutiny → Selection → Awarded`.
  - Prominent **Deficiency Notification Alert Banner** with officer notes, response deadline, and one-click resolution.
  - Financial grant and DBT entitlement overview (JRF ₹31,000/mo + HRA).
- **Scholarship Discovery**:
  - Scheme cards for **National Fellowship for Scheduled Tribes (NFST)** (750 slots) and **National Overseas Scholarship (NOS)** (20 slots).
  - Detailed modal with statutory guidelines, eligibility overview, required documents, and illustrative disclaimers.
- **Application Wizard (8 Steps)**:
  - Step 1: Personal Details (Tribal identity, Father's name, DoB, Aadhaar VID).
  - Step 2: Contact & Address (Village, Block, District, State, PIN).
  - Step 3: Academic Qualifications (Master's marks, UGC-NET/CSIR/GATE scorecards).
  - Step 4: Scheme & Research Plan (Supervisor, University, Ph.D. synopsis).
  - Step 5: Statutory Eligibility Questionnaire (Domicile, income ceiling, regular enrollment).
  - Step 6: AI-Assisted Document Upload & Advisory Pre-screening.
  - Step 7: Review & Statutory Legal Undertaking.
  - Step 8: Submission Confirmation (Generates official reference ID and printable receipt).
- **AI Document Intelligence Engine**:
  - Interactive OCR scanner simulation with 4 preset demonstration documents:
    1. *Clean ST Certificate* (99% confidence, official Ashoka emblem detected, full match).
    2. *Name Mismatch Certificate* (Discrepancy: `Jampa D. Bhotia` vs `Jampa Dorjee Bhotia`).
    3. *Expired / Blurry Income Certificate* (110 DPI, blurred seal, expired FY issue date).
    4. *Fresh Corrected Tehsildar Certificate* (350 DPI, valid e-District QR, FY 2025-26).
  - Shows scan resolution, blur score, NLP entity mapping, rule consistency checks, and manual edit correction capability.
  - Advisory transparency notice: **AI assists pre-screening; human officers verify**.
- **Application Tracking & Deficiency Resolution**:
  - Chronological timeline with official timestamps and desk details.
  - **Interactive Deficiency Response Box**: view officer remarks, upload fresh Tehsildar certificate, enter applicant clarification, and resubmit to Scrutiny Desk.
- **Fellowship & Direct Benefit Transfer (DBT)**:
  - Official Sanction Order viewer (`MOTA/NOS/2026/AW-0042`).
  - PFMS Aadhaar-seeded bank account mapping status.
  - Quarterly DBT installment disbursement table with RBI/PFMS reference numbers.
  - Quarterly Progress Report (QPR) submission interface for renewal.

---

### 2. Ministry Administrator & Verification Officer Portal
- **Administrative Dashboard & Analytics**:
  - Operational KPIs: Total Applications (1,480), Pending Verification (214), Active Deficiencies (86), Scrutiny Queue (342), Awarded (620), Urgent (< 48 hrs).
  - Charts: Application Funnel Trajectory, Geographic State Distribution, and Turnaround Time (TAT) impact (from 14.2 days to 2.4 days with AI pre-screening).
  - Priority Desk Queue table for urgent applications.
- **Applications Master Ledger**:
  - Filterable, searchable grid with filters for Scheme, State, Verification Status, Stage, and Assigned Officer.
  - **Functional CSV Export**: downloads real `.csv` file containing filtered records.
- **Application Review Workspace (Centerpiece)**:
  - **Left Panel (Dossier)**: Profile details, Document viewer with simulated PDF rendering and cryptographic hashes, and processing history.
  - **Right Panel (AI & Officer Decisions)**: Side-by-side comparison between submitted form and OCR extracted values, statutory eligibility checklist, and decision controls:
    - *Mark Document Verified*
    - *Raise Formal Deficiency* (with standard reason dropdown, custom text, and deadline)
    - *Approve Eligibility & Forward to Scrutiny Committee*
    - *Reject Application*
  - Mandatory confirmation modal requiring officer remarks for complete administrative accountability.
- **Deficiency Correction Queue**:
  - Specialized triage queue filtering applications "Awaiting Student" vs "Clarification Submitted".
  - One-click inspection of newly uploaded rectified documents.
- **Selection & Scrutiny Workspace**:
  - Transparent composite merit scoring: Academic Marks (40%) + Research Proposal Quality (30%) + Institutional Ranking Tier (30%).
  - Human-in-the-loop committee authorization.
  - Sanction Order generation and PFMS DBT linking.
- **Configurable Scheme Rules**:
  - Policy configurator for NFST and NOS: income ceiling adjustments, minimum Master's marks, age limits, quota slots, and application dates.
  - Changes instantly evaluate live across the portal.
- **Immutable Audit Trail**:
  - Chronological tamper-evident audit ledger recording: Timestamp, Authorizing User & Role, Action Name, Application Reference, Status Transition, and Remarks.
  - One-click CSV export of audit logs.

---

### 3. Built-In 3–5 Minute Demo Helper
- Sticky interactive banner at the top of the interface that guides judges step-by-step through the 15-step demonstration scenario.
- Includes "Next Demo Action", "Back", step jump selector, and a "Reset Demo Data" button for repeatable presentations.

---

## 🔍 Verification & Test Results

### 1. Build Verification
```bash
> vite build
✓ 1507 modules transformed.
dist/index.html                   1.09 kB │ gzip:   0.65 kB
dist/assets/index-B1F7O_Vt.css   40.59 kB │ gzip:   7.08 kB
dist/assets/index-CPBGzN4G.js   413.84 kB │ gzip: 102.59 kB
✓ built in 6.02s
Exit code: 0
```

### 2. Runtime Server Test
```bash
HTTP/1.1 200 OK
Content-Type: text/html
Local URL: http://localhost:5173/
```
The application starts in under 1 second, with zero console errors or broken imports.

### 3. End-to-End Demo Script Execution
1. ✅ **Student Portal**: Browse NFST & NOS scheme cards.
2. ✅ **Application Wizard**: Step through personal, academic, and scheme details; select test certificate in AI Pre-screening module.
3. ✅ **AI Document Intelligence**: Observe OCR simulation, blur index, and advisory notice regarding expired FY certificate.
4. ✅ **Submission**: Generate Reference ID `MOTA-2026-NFST-0101`.
5. ✅ **Deficiency Notice**: Observe amber action alert on Student Dashboard.
6. ✅ **Switch to Officer**: Switch role to Dr. Arvind Soren; open Review Workspace.
7. ✅ **Review Workspace**: Inspect side-by-side OCR vs form, evaluate eligibility checklist, raise formal deficiency.
8. ✅ **Deficiency Resolution**: Switch back to Student Portal, review officer observation, upload fresh FY 2025-26 certificate, and submit.
9. ✅ **Re-Verification**: Switch to Admin Portal, view clarification in Deficiency Queue, mark document verified, and forward to Scrutiny Committee.
10. ✅ **Audit Ledger & CSV Export**: Check timestamped audit trail entry and trigger CSV download.
