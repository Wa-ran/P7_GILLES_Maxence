const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/putInfos', userCtrl.modifUserInfos);
router.put('/putEmail', userCtrl.modifUserEmail);
router.put('/putPass', userCtrl.modifUserPass);

module.exports = router;