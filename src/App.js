import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx';
import UserList from './components/UserList.jsx'
import UserForm from './components/UserForm.jsx'
import ResumeForm from './components/resume.jsx'
import {Container} from '@mui/material'
import Menu from "./components/NavBar.jsx"
import SignUpForm from './components/SignUpForm.jsx';
import LogInForm from './components/LogInForm.jsx';
import ResumeInput from './components/ResumeInput.jsx';

export default function App(){
  return (
		<>
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
						</Routes>
					</Container>
				</BrowserRouter>
			</UserProvider>
		</>
  )
}