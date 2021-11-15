const express = require('express');
const router = express.Router();
const announces = require('../controllers/announces');
const multer = require('../middleware/multer-config');
const annoncejeff = require('../controllers/announcejeff')

router.get('/allAnnounces', announces.getAnnounces)
router.post('/allAnnounces',multer, announces.createAnnounces)
router.post('/creatannouncewithpics', annoncejeff.createAnnounces)
router.get('/:id', announces.getOneAnnounces);
router.put('/:id', announces.modifyAnnounces);
router.delete('/:id', announces.deleteAnnounces);


module.exports = router;