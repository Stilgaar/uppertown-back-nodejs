const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/token', userCtrl.getToken);
router.patch('/modifyUser', userCtrl.modifyData);
router.post('/addCoins', userCtrl.getCoins);
router.put('/:id', userCtrl.modifySC);//modifie la valeur du portefeuille
router.get('/:id', userCtrl.getOneUser); 
router.post('/addMoney', userCtrl.addMoney)
router.post('/askMoney', userCtrl.askMoney)
router.post('/archiveMoney', userCtrl.archiveMoney)
router.post('/archiveEuros', userCtrl.archiveEuros)
router.post('/transactionDone', userCtrl.transactionDone)
router.post('/transtactionEuroDone', userCtrl.transtactionEuroDone)
//router.put('/:id', userCtrl.modifyUser);
router.get('/:id', userCtrl.getOneUser); // fait planter les routes qu'on mets derrière

module.exports = router;

