-- Revised Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL, -- Retained for login purposes
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--PAST RESUME TABLE
CREATE TABLE IF NOT EXISTS resumes (
    resume_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    title VARCHAR(255),
    summary VARCHAR(255),
    experience VARCHAR(255),
    education VARCHAR(255),
    skills VARCHAR(255),
    pdfFormat VARCHAR(255),
    resume_Verification_Token VARCHAR(255)-- resume template

);

--NEW RESUME TABLE (UNCONNECTED)
-- Resume Table (connects to users)
CREATE TABLE IF NOT EXISTS resumes_v2 (
    resume_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    created_at DATE DEFAULT CURRENT_DATE
);

-- Updated Personal Information Table
CREATE TABLE IF NOT EXISTS personal_information (
    personal_info_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    middle_initial CHAR(1),
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,    -- Note, this email can or not be different from the user's account
    phone_number VARCHAR(20),   -- Formato 123-123-1234
    address VARCHAR(255),   -- La dirección completa
    socials VARCHAR(255),   -- Links a redes sociales separados por coma
    summary TEXT
);

-- Work Experience (references resumes instead of users)
CREATE TABLE IF NOT EXISTS work_experience (
    experience_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    job_description TEXT
);

-- Education (references resumes instead of users)
CREATE TABLE IF NOT EXISTS education (
    education_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE
);

-- Skills (references resumes instead of users)
CREATE TABLE IF NOT EXISTS skills (
    skill_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    skill_name VARCHAR(255) NOT NULL,
    proficiency_level VARCHAR(255)
);

-- Table for Additional Information (related to additionalModal.js)
CREATE TABLE IF NOT EXISTS additional_info (
    additional_info_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    info_title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table for Career Objectives (related to careerObjModal.js)
CREATE TABLE IF NOT EXISTS career_objectives (
    objective_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    objective TEXT NOT NULL
);

-- Table for Certifications (related to certificationModal.js)
CREATE TABLE IF NOT EXISTS certifications (
    certification_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    certification_name VARCHAR(255) NOT NULL,
    issued_by VARCHAR(255) NOT NULL,
    issue_date DATE,
    expiration_date DATE
);

-- Table for Language Proficiency (related to LanguageProfModal.js)
CREATE TABLE IF NOT EXISTS language_proficiency (
    language_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    language_name VARCHAR(255) NOT NULL,
    proficiency_level VARCHAR(255) NOT NULL  -- Expected values like 'Basic', 'Intermediate', 'Advanced' or later on 1-5 rating
);

-- Table for Projects (related to projectModal.js)
CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    resume_id INTEGER NOT NULL REFERENCES resumes_v2(resume_id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    technologies_used TEXT  
);

