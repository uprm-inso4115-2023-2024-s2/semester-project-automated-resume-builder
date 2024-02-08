
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

export default function TaskForm(){

  const [task, setTask] = useState({
    title: '',
    description: ''
  }) 

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async e =>{
    e.preventDefault();

    setLoading(true)

    if (editing){
      const res = await fetch(`http://localhost:4000/tasks/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json'}
      });
    }else{
      const res = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json'}
      });
    }

    
    
    setLoading(false)
    navigate('/')
  }

  const handleChange = e =>{
    setTask({...task, [e.target.name]: e.target.value})
  }

  const loadTasks = async (id) =>{
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()
    setTask({title: data.title, description: data.description})
    setEditing(true)
  }

  useEffect( () => {
      if (params.id){
        loadTasks(params.id)
      }
  }, [params.id])


  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{mt: 5}} style={{
          backgroundColor: '#1e272e',
          padding: '1rem'
        }}>
          <Typography variant="5" textAlign='center' color='white'>
            {editing ? "Edit Task" : "Create Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField 
                variant="filled"
                label="Write your title"
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}
                inputProps={{
                  style: {color: 'white'}
                }}
                InputLabelProps={{
                  style: {color: 'white'}
                }}
                onChange={handleChange}
                name="title"
                value={task.title}
              />
              <TextField 
                variant="filled"
                label='Write your description'
                multiline
                rows={4}
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}
                inputProps={{
                  style: {color: 'white'}
                }}
                InputLabelProps={{
                  style: {color: 'white'}
                }}
                onChange={handleChange}
                name="description"
                value={task.description}
              />

              <Button variant="contained" color="primary" type="submit" disabled={!task.title || !task.description}>
                {loading ? <CircularProgress color="inherit" size={24} /> : 'Save'} 
              </Button>

            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}