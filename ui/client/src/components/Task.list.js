
import {useEffect, useState} from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../contexts/UserContext';

export default function TaskList(){

    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    const { user, setUser } = useUser();

    const loadTasks = async () =>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`)
        const data = await response.json()
        setTasks(data)
        console.log(tasks)
        
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}` , {
            method: "DELETE"
            })
            
            setTasks(tasks.filter(task => task.id !== id))
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect( () =>{
        loadTasks()
    }, [])

// TEST The h1 is just a Test of the user attributes TEST
// To clear the test just erase the h1 line 3 lines below
    return (
      <>
      <h1>Task List {user.name}</h1>

        {
            tasks.map((task) => (
                <Card key={task.id} style={{
                    marginBottom: ".7rem",
                    backgroundColor: '#1e272e'
                }}>
                    <CardContent style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{
                            color: 'white'
                        }}>
                            <Typography>{task.title}</Typography>
                            <Typography>{task.description}</Typography> 
                        </div>

                        <div>
                            <Button variant='contained' color='inherit' onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                                Edit
                            </Button>

                            <Button variant='contained' color='warning' onClick={() => handleDelete(task.id)} style={{margin: '.5rem'}}>
                                Delete
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            ))
        }
      
      </>
    );
  }