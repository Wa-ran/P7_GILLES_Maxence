const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const gpm = require('../controllers/gpm');

router.get('/depts', gpm.getDeptsList);
router.get('/lastAnnonce', auth, gpm.getLastAnnonce);
router.get('/groupeList', auth, gpm.getGroupeList);

router.get('/groupe/:groupe', auth, gpm.getGroupeContent);
router.post('/groupe/create', auth, gpm.postGroupe);
router.get('/groupe/:groupe/member', auth, gpm.getGroupeMember);
router.put('/groupe/grant', auth, gpm.putGroupeMember);

router.get('/participation/:participationId', auth, gpm.getParticipationInfos);
router.post('/participation/create', auth, gpm.postParticipation);
router.get('/participation/:participationId/member', auth, gpm.getParticipationMember);
router.put('/participation/:participationId/grant', auth, gpm.putParticipationMember);

router.get('/participation/:participationId/commentaire', auth, gpm.getParticipationComment);
router.post('/participation/:participationId/commentaire', auth, gpm.postCommentaire);

module.exports = router;