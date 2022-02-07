const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
let multer = require('multer')
let upload = multer()

router.post('/signup', upload.fields([]), userCtrl.signup);
router.post('/login', upload.fields([]), userCtrl.login);
router.post('/modifyUser/:id', upload.fields([]), userCtrl.modifyUser);
router.post('/addCoins/:id', upload.fields([]), userCtrl.addCoins);

router.post('/addMoney/:id', upload.fields([]), userCtrl.addMoney)
router.post('/askMoney/:id', upload.fields([]), userCtrl.askMoney)
router.post('/archiveMoney/:id', upload.fields([]), userCtrl.archiveMoney)
router.post('/archiveEuros/:id', upload.fields([]), userCtrl.archiveEuros)
router.post('/transactionDone/:id', upload.fields([]), userCtrl.transactionDone)
router.post('/transtactionEuroDone/:id', upload.fields([]), userCtrl.transtactionEuroDone)

router.get('/users', userCtrl.getAllUsers);
router.get('/token', userCtrl.getToken);
router.get('/:id', userCtrl.getOneUser);
router.get('/transacs/:id', userCtrl.getALlTransacs)
router.get('/props/:id', userCtrl.getAllProps)

module.exports = router;

