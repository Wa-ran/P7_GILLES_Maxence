const express = require('express');
const router = express.Router();

const getDeptsCtrl = require('../controllers/getDepts');

router.get('', getDeptsCtrl.get);

module.exports = router;