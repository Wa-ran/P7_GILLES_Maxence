const express = require('express');
const router = express.Router();

const gpm = require('../controllers/gpm');

router.get('', gpm.getDepts);

module.exports = router;