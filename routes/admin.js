const express = require('express');
const router = express.Router();
const admin = require("../controllers/admin")
const adminData = require("../controllers/adminData")

router.post('/verifPi', admin.verifPi)
router.post('/verifJDD', admin.verifJDD)
router.post('/verifAVIS', admin.verifAVIS)
router.post('/goAdmin', admin.goAdmin)
router.post('/noAdmin', admin.noAdmin)

router.post('/newRib', adminData.addRib)
router.get('/getRib', adminData.getRib)
router.post('/maintext', adminData.addAdminText)


module.exports = router;