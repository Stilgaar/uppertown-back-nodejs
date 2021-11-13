const express = require('express');
const router = express.Router();
const properties = require('../controllers/properties');
const multer = require('../middleware/multer-config');

router.get('/allProperties', properties.getProperties)
router.post('/allProperties', multer, properties.createProperties)
router.get('/:id', properties.getOneProperties);
router.put('/:id', properties.modifyProperties);
router.delete('/:id', properties.deleteProperties);

module.exports = router;