
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useUser } from '../contexts/UserContext';
import Menu from "./NavBar"
export default function UserForm(){

  // TEST Access the User Context and its attributes TEST//
  const { globalUser, setGlobalUser } = useUser();
  

  const [user, setuser] = useState({
      email: "",
      password: "",
      name: "",
      middle_initial: "",
      frst_lst_name: "",
      scnd_lst_name: "",
      phone_number: "",
      summary: "",
      profile: ""
  }) 

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async e =>{
    e.preventDefault();
    setLoading(true);

    if (editing){
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
      });
    }else{
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
      });
    }

    setLoading(false)
    navigate('/')
  }

  const handleChange = e =>{
    setuser({...user, [e.target.name]: e.target.value})
  }

  const loadusers = async (id) =>{
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`)
    const data = await res.json()
    setuser(
      {
      user_id: data.user_id,
      email: data.email,
      password_hash: data.password_hash,
      name: data.name,
      middle_initial: data.middle_initial,
      frst_lst_name: data.frst_lst_name,
      scnd_lst_name: data.scnd_lst_name,
      phone_number: data.phone_number,
      summary: data.summary,
      profile: data.profile
    })
    setEditing(true)
  }

  useEffect( () => {
      if (params.id){
        loadusers(params.id)
      }
  }, [params.id])
// TEST The h1 is just a Test of the user attributes TEST
// To clear the test just erase the h1 line 3 lines below
  return (
    <div>
      <Menu />
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <h1>{globalUser.name} {user.middle_initial} {user.frst_lst_name}</h1>
        <Grid item xs={3}>
          <Card sx={{mt: 5}} style={{
            backgroundColor: '#1e272e',
            padding: '1rem'
          }}>
            <Typography variant="5" textAlign='center' color='white'>
              {editing ? "Edit user" : "Create user"}
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
                  name="name"
                  value={user.name}
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
                  name="email"
                  value={user.email}
                />
                <Button variant="contained" color="primary" type="submit" disabled={!user.email || !user.name}>
                  {loading ? <CircularProgress color="inherit" size={24} /> : 'Save'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}