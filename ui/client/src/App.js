import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.js';
import TaskList from './components/Task.list'
import TaskForm from './components/TaskForm'
import ResumeForm from './components/resume'
import {Container} from '@mui/material'
import Menu from "./components/NavBar"

export default function App(){
  return (
    <UserProvider>
      <BrowserRouter>
        <Menu />
        <Container>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/tasks/new' element={<TaskForm />} />
            <Route path='/tasks/:id/edit' element={<TaskForm />} />
            <Route path='/resume/new' element={<ResumeForm />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>
  )
}