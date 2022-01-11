const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/token', userCtrl.getToken);
router.post('/modifyUser/:id', userCtrl.modifyUser);
router.post('/addCoins/:id', userCtrl.addCoins);
router.get('/:id', userCtrl.getOneUser);
router.post('/addMoney/:id', userCtrl.addMoney)
router.post('/askMoney/:id', userCtrl.askMoney)
router.post('/archiveMoney/:id', userCtrl.archiveMoney)
router.post('/archiveEuros/:id', userCtrl.archiveEuros)
router.post('/transactionDone/:id', userCtrl.transactionDone)
router.post('/transtactionEuroDone/:id', userCtrl.transtactionEuroDone)
router.get('/transacs/:id', userCtrl.getALlTransacs)
router.get('/props/:id', userCtrl.getAllProps)

module.exports = router;

