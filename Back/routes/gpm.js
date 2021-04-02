const express = require('express');
const router = express.Router();

const gpm = require('../controllers/gpm');

router.get('/depts', gpm.getDepts);
router.get('/lastAnnonce', gpm.lastAnnonce);
router.get('/groupe', gpm.getGroupeList);
router.get('/groupe/:groupe', gpm.getGroupeContent);

module.exports = router;