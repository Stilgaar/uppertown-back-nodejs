const express = require('express');
const router = express.Router();
let multer = require('multer')
let upload = multer()

const transac = require('../controllers/transac')


// route unique pour les transactions.
router.post('/transac', upload.fields([]), transac.oneTransac)

module.exports = router