const { Router } = require('express');
const { 
    getAllUsers,
    getUser,
    getDownload,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller')

const router = Router();

// Para obtener todos los usuarios
router.get('/users', getAllUsers)

// Para obtener un usuario por user_id
router.get('/users/:user_id', getUser)

// Call to create a pdf document off of the given resume (temporarily puts the user's username in the pdf)
// Only missing the fromatting required to write to the pdf, all the base for writing said text is ready
router.post('/users/:user_id/dummyResumen/download', getDownload)

// Para crear un nuevo usuario
router.post('/users', createUser)

// Para actualizar un usuario
router.delete('/users/:user_id', deleteUser)

router.put('/users/:user_id', updateUser) 

module.exports = router;