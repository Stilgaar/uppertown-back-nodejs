const express = require('express');
const router = express.Router();
const announces = require('../controllers/announces');

router.get('/allAnnounces', announces.getAnnounces)



module.exports = router;