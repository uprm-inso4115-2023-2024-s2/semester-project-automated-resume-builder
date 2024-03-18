import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { UserProvider } from './contexts/UserContext.js';
import TaskList from './components/Task.list';
import TaskForm from './components/TaskForm';
import ResumeForm from './components/resume.js';
import ResumeTemplates from './components/templates.js'; // Import the ResumeTemplates component
import { Container } from '@mui/material';
import Menu from "./components/NavBar";
import TemplateEditor from './components/ResumeEditor.js';
export default function App() {
  const [submittedResume, setSubmittedResume] = useState(null);

  const handleResumeSubmit = (resumeData) => {
    setSubmittedResume(resumeData);
  };

  return (
    // <UserProvider>
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<TaskForm />} />
          <Route path='/tasks/:id/edit' element={<TaskForm />} />
          <Route path='/resume/new' element={<ResumeForm submitCallBack={handleResumeSubmit} />} />
          {/* Pass the submitted resume data to ResumeTemplates */}
          <Route path='/resume/templates' element={<ResumeTemplates submittedResume={submittedResume} />} />
          {/* <Route path='/resume/templates/editor' element={<TemplateEditor />} /> */}


        </Routes>
      </Container>
    </BrowserRouter>
  //   </UserProvider>
  );
}