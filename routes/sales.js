const express = require('express');
const router = express.Router();
const salesCtrl = require('../controllers/sales');

router.post('/sell', salesCtrl.createSales);
router.get('/history', salesCtrl.getSales);
router.get('/:id', salesCtrl.getOneSales);
router.put('/:id', salesCtrl.updateSales);
router.delete('/:id', salesCtrl.deleteSales); 

module.exports = router;