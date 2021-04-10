const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const gpm = require('../controllers/gpm');

router.get('/depts', gpm.getDeptsList);
router.get('/lastAnnonce', auth, gpm.getLastAnnonce);
router.get('/groupe', auth, gpm.getGroupeList);
router.get('/groupe/:groupe', auth, gpm.getGroupeContent);
router.post('/groupe/create', auth, gpm.postGroupe);
router.post('/participation/create', auth, gpm.postParticipation);

module.exports = router;