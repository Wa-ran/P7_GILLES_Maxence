const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const password = require('../middlewares/password')

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/login', userCtrl.fetch);

module.exports = router;