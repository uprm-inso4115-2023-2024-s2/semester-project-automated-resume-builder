
import {useEffect, useState} from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../contexts/UserContext';

export default function UserList(){

    const [users, setusers] = useState([])
    const navigate = useNavigate()
    const { globalUser, setGlobalUser } = useUser();

    const loadusers = async () =>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
        const data = await response.json()
        setusers(data)
        console.log(users)
        
    }

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}` , {
            method: "DELETE"
            })
            
            setusers(users.filter(user => user.user_id !== id))
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect( () =>{
        loadusers()
    }, [])

// TEST The h1 is just a Test of the user attributes TEST
// To clear the test just erase the h1 line 3 lines below
    return (
      <>
      <h1>user List {globalUser.name}</h1>

        {
            users.map((user) => (
                <Card key={user.user_id} style={{
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
                            <Typography>{user.email}</Typography>
                            <Typography>{user.name}</Typography> 
                        </div>

                        <div>
                            <Button variant='contained' color='inherit' onClick={() => navigate(`/users/${user.user_id}/edit`)}>
                                Edit
                            </Button>

                            <Button variant='contained' color='warning' onClick={() => handleDelete(user.user_id)} style={{margin: '.5rem'}}>
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