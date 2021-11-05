const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.getAllUsers);
router.get('/token', userCtrl.getToken);
router.patch('/modifyUser', userCtrl.modifyData);
router.put('/:id', userCtrl.modifyUser);
router.get('/:id', userCtrl.getOneUser); // fait planter les routes qu'on mets derrière

module.exports = router;

