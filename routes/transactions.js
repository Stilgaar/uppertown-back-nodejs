const express = require('express');
const router = express.Router();
const transacCtrl = require('../controllers/transactions');

router.post('/buy', transacCtrl.createTransactions);
router.get('/history', transacCtrl.getTransactions);
router.get('/:id', transacCtrl.getOneTransactions);
router.put('/:id', transacCtrl.updateTransactions);
router.delete('/:id', transacCtrl.deleteTransactions); 

module.exports = router;
