const express = require('express');
const router = express.Router();
const properties = require('../controllers/properties');
const multer = require('../middleware/multer-config');

router.get('/allProperties', properties.getProperties)
router.post('/allProperties', multer, properties.createProperties)
router.get('/datas/:id/:announceid', properties.getOneProperties);
router.get('/owner/:id/', properties.getEachPropertiesList);
router.get('/:id/:announceid', properties.existsProperties);
router.put('/:id/:announceid', properties.modifyProperties);
router.delete('/:id', properties.deleteProperties);

module.exports = router;