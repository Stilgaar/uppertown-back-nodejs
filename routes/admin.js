const express = require('express');
const router = express.Router();
const admin = require("../controllers/admin")
const adminData = require("../controllers/adminData")

router.post('/verifPi/:id', admin.verifPi)
router.post('/verifJDD/:id', admin.verifJDD)
router.post('/verifAVIS/:id', admin.verifAVIS)
router.post('/goAdmin/:id', admin.goAdmin)
router.post('/noAdmin/:id', admin.noAdmin)

router.post('/newRib', adminData.addRib)
router.get('/getRib', adminData.getRib)
router.get('/hostnameurl', adminData.getHostURL)
router.get('/hostnamelocal', adminData.getHostURLLOCAL)
router.post('/maintext', adminData.addAdminText)


module.exports = router;