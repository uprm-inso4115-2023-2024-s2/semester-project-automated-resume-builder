const { Router } = require('express');
const {
    getPersonalInfo,
    savePersonalInfo,
    updatePersonalInfo,
    deletePersonalInfo,
} = require('../controllers/personal.info.controller');

const router = Router();

router.get('/personal-info/user/:user_id', getPersonalInfo); // Fetch by user_id
router.post('/personal-info', savePersonalInfo); // creates new personal info
router.put('/personal-info/:personal_info_id', updatePersonalInfo); // Update existing personal info
router.delete('/personal-info/:personal_info_id', deletePersonalInfo); // Delete by personal_info_id

module.exports = router;
