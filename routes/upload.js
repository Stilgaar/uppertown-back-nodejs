const express = require('express');
const router = express.Router();
const upload = require("../controllers/upload")

router.post('/id/:id', upload.newUpId);
router.post('/jdd/:id', upload.newUpJdd)
router.post('/avis/:id', upload.newUpAvis)
router.post('/rib/:id', upload.newUpRiB)

router.post('/delete/:id', upload.supprimerDoc)

module.exports = router;