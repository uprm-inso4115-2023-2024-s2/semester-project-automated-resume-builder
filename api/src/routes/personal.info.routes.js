const { Router } = require('express');
const {
    getPersonalInfo,
    savePersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
} = require('../controllers/personal.info.controller');

const router = Router();

router.get('/personal-info/resume/:resume_id', getPersonalInfo); // Fetch personal info by resume_id
router.post('/personal-info', savePersonalInfo); // creates new personal info
router.put('/personal-info/resume/:resume_id', updatePersonalInfo); // Update existing personal info by resume_id
router.delete('/personal-info/resume/:resume_id', deletePersonalInfo); // Delete by personal info by resume_id

module.exports = router;
