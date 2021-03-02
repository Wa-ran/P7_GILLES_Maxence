const express = require('express');
const router = express.Router();

const deptsCtrl = require('../controllers/depts');

router.get('', deptsCtrl.get);

module.exports = router;