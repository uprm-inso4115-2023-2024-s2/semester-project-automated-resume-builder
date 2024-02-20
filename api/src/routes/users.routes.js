const { Router } = require('express');
const { 
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller')

const router = Router();

// Para obtener todos los usuarios
router.get('/users', getAllUsers)

// Para obtener un usuario por user_id
router.get('/users/:user_id', getUser)

// Para crear un nuevo usuario
router.post('/users', createUser)

// Para actualizar un usuario
router.delete('/users/:user_id', updateUser)

router.put('/users/:user_id', deleteUser) 

module.exports = router;