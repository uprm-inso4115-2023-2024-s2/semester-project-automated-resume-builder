// App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.js';
import { Container } from '@mui/material';
import MenuContainer from "./components/MenuContainer";
import LandingPage from './components/LandingPage.js';
import UserForm from './components/UserForm.js';
import ResumeForm from './components/resume';
import SignUpForm from './components/SignUpForm.js';
import LogInForm from './components/LogInForm.js';
import ResumeInput from './components/ResumeInput.js';
import PreviewPage from './components/PreviewPage.js'
import SkillsPage from './components/DataEntryForm/SkillsPage.js';
import ResumeTemplates from './components/templates.js';
import PersonalInfo from './components/PersonalInfo/PersonalInfo.js';
import Education from './components/Education/Education.js';

export default function App() {
const [submittedResume, setSubmittedResume] = useState(null);

const handleResumeSubmit = (resumeData) => {
  setSubmittedResume(resumeData);
};
  return (
    <UserProvider>
      // <UserProvider>
    <BrowserRouter>
        <MenuContainer /> {/* Render the MenuContainer component */}
        <Container>
          <Routes>
            {/* Landing Page */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/users/new' element={<UserForm />} />
            <Route path='/users/:id/edit' element={<UserForm />} />
            <Route path='/resume/new' element={<ResumeForm submitCallBack={handleResumeSubmit} />} />
            {/* Pass the submitted resume data to ResumeTemplates */}
            <Route path='/resume/templates' element={<ResumeTemplates submittedResume={submittedResume} />} />
            {/* <Route path='/resume/templates/editor' element={<TemplateEditor />} /> */}
            
            <Route path='/signup' element={<SignUpForm onSignUp={() => {console.log("signed up")}} />} />
            <Route path='/login' element={<LogInForm onLogIn={() => {console.log("Logged in")}} />} />
            <Route path='/resume/datainput' element={<ResumeInput onSubmitResumeForm={() => {console.log("Submitted resume info")}} />} />
            <Route path='/resume/personalInfo' element={<PersonalInfo />}></Route>
            <Route path='/resume/education' element={<Education />}></Route>
            <Route path='/resume/preview' element={<PreviewPage />} />
            <Route path='/resume/datainput/skills' element={<SkillsPage />} />
            <Route path='/resume/templates' element={<ResumeTemplates submittedResume={submittedResume} />} />
            <Route path='/resume/new' element={<ResumeForm submitCallBack={handleResumeSubmit} />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>
  //   </UserProvider>
  );
}
