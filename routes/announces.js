const express = require('express');
const router = express.Router();
const annoncejeff = require('../controllers/announcejeff')


router.post('/creatannouncewithpics', annoncejeff.createAnnounces)

// avoir toutes les annonces, spécifiquement pour l'interface announce
router.get('/allAnnounces', annoncejeff.getAnnounces)
router.get('/randomAnnounce', annoncejeff.randomAnnounce)

// todo : 
// une route pour la page d'acceuil avec une annonce unique avec le math random dans le back
// une route pour les infos affichés dans la page d'acceuil pour pas tout recevoir

// avoir une annonce complète en détail, spécifiquement pour l'announce détail
router.get('/:id', annoncejeff.getOneAnnounces);

// route pas encore utilisée mais bientot (t'as vu ?)
router.delete('/:id', annoncejeff.deleteAnnounces);

module.exports = router;