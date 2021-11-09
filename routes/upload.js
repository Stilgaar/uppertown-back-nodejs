const express = require('express');
const router = express.Router();
const upload = require("../controllers/upload")

router.post('/id', upload.newUpId );
router.post('/jdd', upload.newUpJdd)
router.post('/avis', upload.newUpAvis)
router.post('/rib', upload.newUpRiB)

router.post('/delete', upload.supprimerDoc)

module.exports = router;