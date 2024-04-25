const { Router } = require('express');
const {
    getAllUsers,
    getUser,
    getDownload,
    verifiedEmail,
    signUpUser,
    logInUser,
    saveResume,
    getResume,
    getAllResumes,
    updateUser,
    deleteUser,
    getUserDetailsByToken
} = require('../controllers/users.controller');

const router = Router();

// User management routes
router.get('/users', getAllUsers);
router.get('/users/me', getUserDetailsByToken);
router.get('/users/:user_id', getUser);
router.post('/users', signUpUser); // Route for signing up a new user
router.post('/users/login', logInUser); // Route for user login
router.delete('/users/:user_id', deleteUser); // Route to delete a user
router.put('/users/:user_id', updateUser); // Route to update user details
router.get('/verificar-email', verifiedEmail); // Route to handle email verification link

// Resume management routes
router.post('/resume/save', saveResume); // Route to save a new resume
router.get('/resume/:resume_id', getResume); // Route to get a specific resume by ID
router.get('/resume', getAllResumes); // Route to get all resumes
+

router.post('/users/:user_id/dummyResume/download', getDownload);

module.exports = router;
