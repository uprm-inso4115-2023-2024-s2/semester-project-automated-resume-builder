const { Router } = require('express');
const { 
    getPersonalInfo, 
    savePersonalInfo, 
    deletePersonalInfo,
} = require('../controllers/personal.info.controller');

const router = Router();

router.get('/personal-info/:personal_info_id', getPersonalInfo);
router.post('/personal-info', savePersonalInfo);
router.delete('/personal-info/:personal_info_id', deletePersonalInfo);

module.exports = router;