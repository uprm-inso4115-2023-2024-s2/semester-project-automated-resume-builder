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

-- Updated Personal Information Table
CREATE TABLE IF NOT EXISTS personal_information (
    personal_info_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    middle_initial CHAR(1),
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),   -- Formato 123-123-1234
    address VARCHAR(255),   -- La dirección completa
    socials VARCHAR(255),   -- Links a redes sociales separados por coma
    summary TEXT,
    profile TEXT
);

-- Tabla para las experiencias laborales del usuario.
CREATE TABLE IF NOT EXISTS work_experience (
    experience_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    job_description TEXT
);

-- Tabla para la educación del usuario.
CREATE TABLE IF NOT EXISTS education (
    education_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE 
);

-- Tabla para lo skills del usuario.
CREATE TABLE IF NOT EXISTS skills (
    skill_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    skill_name VARCHAR(255) NOT NULL,
    proficiency_level VARCHAR(255) -- VARCHAR para permitir descripciones como 'Principiante', 'Intermedio', 'Avanzado'.
                                   -- Se puede cambiar a un ENUM si se quiere limitar las opciones o que sea del 1 - 5.
);

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