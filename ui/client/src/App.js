import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.js';
import UserList from './components/UserList.js'
import UserForm from './components/UserForm.js'
import ResumeForm from './components/resume'
import {Container} from '@mui/material'
import Menu from "./components/NavBar"
import SignUpForm from './components/SignUpForm.js';
import LogInForm from './components/LogInForm.js';
import ResumeInput from './components/ResumeInput.js';
import PreviewPage from './components/PreviewPage.js'

export default function App(){
  return (
    <UserProvider>
      <BrowserRouter>
        <Menu />
        <Container>
          <Routes>
            <Route path='/' element={<UserList />} />
            <Route path='/users/new' element={<UserForm />} />
            <Route path='/users/:id/edit' element={<UserForm />} />
            <Route path='/resume/new' element={<ResumeForm />} />
            <Route path='/signup' element={<SignUpForm onSignUp={() => {console.log("signed up")}} />} />
            <Route path='/login' element={<LogInForm onLogIn={() => {console.log("Logged in")}} />} />
            <Route path='/resume/datainput' element={<ResumeInput onSubmitResumeForm={() => {console.log("Submitted resume info")}} />} />
            <Route path='/preview' element={<PreviewPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>
  )
}