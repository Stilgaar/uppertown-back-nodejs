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

module.exports = router;

