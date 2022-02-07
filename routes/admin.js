const express = require('express');
const router = express.Router();
const admin = require("../controllers/admin")
const adminData = require("../controllers/adminData")
let multer = require('multer')
let upload = multer()

// modification des paramètres de l'utilsateur
router.post('/verifPi/:id', admin.verifPi)
router.post('/verifJDD/:id', admin.verifJDD)
router.post('/verifAVIS/:id', admin.verifAVIS)
router.post('/goAdmin/:id', admin.goAdmin)
router.post('/noAdmin/:id', admin.noAdmin)

// modification du rib et du texte de présentation du site (un jour : les couleurs)
router.post('/newRib', upload.fields([]), adminData.addRib)
router.post('/maintext', upload.fields([]), adminData.addAdminText)

// get simple pour affichage
router.get('/getRib', adminData.getRib)
router.get('/hostnameurl', adminData.getHostURL)

// toujours la pour l'useURL du front, mais pas utlisé en ce moment
router.get('/hostnamelocal', adminData.getHostURLLOCAL)



module.exports = router;