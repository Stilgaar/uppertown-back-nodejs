const express = require('express');
const router = express.Router();
const admin = require("../controllers/admin")

router.post('/verifPi', admin.verifPi)
router.post('/verifJDD', admin.verifJDD)
router.post('/verifAVIS', admin.verifAVIS)
router.post('/goAdmin', admin.goAdmin)
router.post('/noAdmin', admin.noAdmin)


module.exports = router;