const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/token', userCtrl.getToken);
router.post('/modifyUser', userCtrl.modifyUser);
router.post('/addCoins', userCtrl.addCoins);
router.put('/:id', userCtrl.modifySC);//modifie la valeur du portefeuille
router.get('/:id', userCtrl.getOneUser);
router.post('/addMoney', userCtrl.addMoney)
router.post('/askMoney', userCtrl.askMoney)
router.post('/archiveMoney', userCtrl.archiveMoney)
router.post('/archiveEuros', userCtrl.archiveEuros)
router.post('/transactionDone', userCtrl.transactionDone)
router.post('/transtactionEuroDone', userCtrl.transtactionEuroDone)
router.get('/transacs/:id', userCtrl.getALlTransacs)

module.exports = router;

