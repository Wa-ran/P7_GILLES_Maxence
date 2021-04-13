const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/putInfos', auth, userCtrl.putInfos);
router.put('/putEmail', auth, userCtrl.putEmail);
router.put('/putPass', auth, userCtrl.putPass);

module.exports = router;