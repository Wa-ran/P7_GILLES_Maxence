const express = require('express');
const router = express.Router();

const articlesCtrl = require('../controllers/articles');

router.get('/lastAnnonce', articlesCtrl.lastAnnonce);

module.exports = router;