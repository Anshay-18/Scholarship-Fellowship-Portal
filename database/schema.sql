-- ==============================================================================
-- MINISTRY OF TRIBAL AFFAIRS, GOVERNMENT OF INDIA
-- AI-Enabled Scholarship & Fellowship Management System for Scheduled Tribes
-- Smart India Hackathon 2026 • MySQL 8.0+ Database DDL
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS mota_scholarship_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mota_scholarship_db;

-- 1. USERS & ACTORS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    role ENUM('STUDENT', 'VERIFICATION_OFFICER', 'MINISTRY_ADMIN') NOT NULL,
    designation VARCHAR(150),
    department VARCHAR(150),
    tribe VARCHAR(100),
    state VARCHAR(100),
    district VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_role (role)
) ENGINE=InnoDB;

-- 2. SCHEMES & CONFIGURABLE POLICY RULES
CREATE TABLE IF NOT EXISTS schemes (
    id VARCHAR(30) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    hindiName VARCHAR(255),
    level VARCHAR(100) NOT NULL,
    ministry VARCHAR(255) DEFAULT 'Ministry of Tribal Affairs, Government of India',
    slots INT NOT NULL,
    academicYear VARCHAR(20) NOT NULL,
    minMasterMarks DECIMAL(5, 2) NOT NULL DEFAULT 55.00,
    maxAge INT NOT NULL DEFAULT 36,
    incomeCeiling DECIMAL(12, 2) DEFAULT 0.00, -- 0.00 indicates no income ceiling
    maxQsRank INT DEFAULT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    correctionDeadline DATE NOT NULL,
    jrfStipend VARCHAR(100),
    srfStipend VARCHAR(100),
    annualMaintenanceUsd VARCHAR(100),
    status ENUM('ACTIVE', 'ARCHIVED', 'DRAFT') DEFAULT 'ACTIVE',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(50) PRIMARY KEY,
    userId VARCHAR(50),
    applicantName VARCHAR(150) NOT NULL,
    fatherName VARCHAR(150) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('Female', 'Male', 'Third Gender') NOT NULL,
    tribe VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    schemeId VARCHAR(30) NOT NULL,
    studyLevel VARCHAR(100) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    supervisor VARCHAR(150),
    researchTopic TEXT,
    qualifyingExam VARCHAR(100),
    masterDegree VARCHAR(150),
    masterPercentage DECIMAL(5, 2) NOT NULL,
    annualFamilyIncome DECIMAL(12, 2) NOT NULL,
    submissionDate DATE NOT NULL,
    stage ENUM('DRAFT', 'SUBMITTED', 'DOCUMENT_VERIFICATION', 'ELIGIBILITY_REVIEW', 'SCRUTINY', 'SELECTION', 'AWARDED', 'REJECTED') DEFAULT 'SUBMITTED',
    verificationStatus ENUM('PENDING', 'AI_FLAGGED', 'DEFICIENCY_RAISED', 'DEFICIENCY_RESOLVED', 'VERIFIED', 'REJECTED') DEFAULT 'PENDING',
    eligibilityStatus ENUM('PENDING', 'UNDER_REVIEW', 'ELIGIBLE', 'INELIGIBLE') DEFAULT 'UNDER_REVIEW',
    assignedOfficer VARCHAR(150),
    assignedDesk VARCHAR(100),
    urgentAttention BOOLEAN DEFAULT FALSE,
    aiPreScreenScore INT DEFAULT 85,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (schemeId) REFERENCES schemes(id) ON UPDATE CASCADE,
    INDEX idx_app_stage (stage),
    INDEX idx_app_status (verificationStatus),
    INDEX idx_app_scheme (schemeId),
    INDEX idx_app_state (state)
) ENGINE=InnoDB;

-- 4. UPLOADED DOCUMENTS & OCR EXTRACTION TABLE
CREATE TABLE IF NOT EXISTS application_documents (
    id VARCHAR(50) PRIMARY KEY,
    applicationId VARCHAR(50) NOT NULL,
    documentType VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    fileName VARCHAR(255) NOT NULL,
    fileSize VARCHAR(50),
    uploadDate DATE NOT NULL,
    status ENUM('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'DEFICIENT', 'DEFICIENCY_RESOLVED') DEFAULT 'PENDING',
    aiStatus ENUM('EXTRACTED_MATCH', 'FLAGGED_MISMATCH', 'FLAGGED_BLURRY_OR_EXPIRED') DEFAULT 'EXTRACTED_MATCH',
    aiConfidence INT DEFAULT 95,
    resolutionDpi INT DEFAULT 300,
    extractedCandidateName VARCHAR(150),
    extractedCertificateNo VARCHAR(100),
    extractedAuthority VARCHAR(150),
    extractedIssueDate VARCHAR(100),
    officerRemark TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (applicationId) REFERENCES applications(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. DEFICIENCIES TABLE
CREATE TABLE IF NOT EXISTS deficiencies (
    id VARCHAR(50) PRIMARY KEY,
    applicationId VARCHAR(50) NOT NULL,
    noticeId VARCHAR(100) NOT NULL UNIQUE,
    dateRaised DATE NOT NULL,
    deadline DATE NOT NULL,
    raisedBy VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    documentType VARCHAR(50) NOT NULL,
    officerNote TEXT NOT NULL,
    applicantResponse TEXT,
    resubmittedDocFileName VARCHAR(255),
    resolved BOOLEAN DEFAULT FALSE,
    resolvedDate DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (applicationId) REFERENCES applications(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. IMMUTABLE AUDIT LEDGER TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user VARCHAR(150) NOT NULL,
    action VARCHAR(100) NOT NULL,
    applicationId VARCHAR(50) NOT NULL,
    prevStatus VARCHAR(100),
    newStatus VARCHAR(100),
    remarks TEXT NOT NULL,
    INDEX idx_audit_app (applicationId),
    INDEX idx_audit_time (timestamp)
) ENGINE=InnoDB;

-- 7. SCHOLARSHIP SANCTIONS & DBT DISBURSEMENT TABLE
CREATE TABLE IF NOT EXISTS scholarship_sanctions (
    id VARCHAR(50) PRIMARY KEY,
    applicationId VARCHAR(50) NOT NULL UNIQUE,
    sanctionNumber VARCHAR(100) NOT NULL UNIQUE,
    sanctionDate DATE NOT NULL,
    sanctionedBy VARCHAR(150) NOT NULL,
    tenureYears INT NOT NULL,
    annualAllowance VARCHAR(100) NOT NULL,
    tuitionCoverage VARCHAR(150) NOT NULL,
    pfmsDbtLinked BOOLEAN DEFAULT TRUE,
    bankAccountMasked VARCHAR(100) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (applicationId) REFERENCES applications(id) ON DELETE CASCADE
) ENGINE=InnoDB;
