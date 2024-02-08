import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskList from './components/Task.list'
import TaskForm from './components/TaskForm'
import {Container} from '@mui/material'
import Menu from "./components/NavBar"

export default function App(){
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<TaskForm />} />
          <Route path='/tasks/:id/edit' element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}