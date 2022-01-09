const express = require('express');
const router = express.Router();

const transac = require('../controllers/transac')

router.post('/transac', transac.oneTransac)

module.exports = router