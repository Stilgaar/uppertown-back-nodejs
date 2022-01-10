const express = require('express');
const router = express.Router();
const annoncejeff = require('../controllers/announcejeff')

router.get('/allAnnounces', annoncejeff.getAnnounces)
router.post('/creatannouncewithpics', annoncejeff.createAnnounces)
router.get('/:id', annoncejeff.getOneAnnounces);
router.delete('/:id', annoncejeff.deleteAnnounces);

module.exports = router;