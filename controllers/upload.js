
const multer = require('multer');
const path = require('path');
const Users = require('../models/users');
const Announce = require('../controllers/announces')

const storageid = multer.diskStorage({
    destination: `private/upload/id`,
    filename: function (req, file, cb) {
        cb(null,
            file.fieldname
            + `-`
            + Date.now()
            + path.extname(file.originalname))}})

const storageJdd = multer.diskStorage({
    destination: `private/upload/Jdd`,
    filename: function (req, file, cb) {
        cb(null,
            file.fieldname
            + `-`
            + Date.now()
            + path.extname(file.originalname))}})

const storageAvis = multer.diskStorage({
    destination: `private/upload/avisfiscal`,
    filename: function (req, file, cb) {
        cb(null,
            file.fieldname
            + `-`
            + Date.now()
            + path.extname(file.originalname))}})

const storageRib = multer.diskStorage({
    destination: `private/upload/rib`,
    filename: function (req, file, cb) {
        cb(null,
            file.fieldname
            + `-`
            + Date.now()
            + path.extname(file.originalname))}})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb(null, false)}}

const uppingId = multer({
    storage: storageid,
    limit: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }}).single('pieceidentite')

const uppingJdd = multer({
    storage: storageJdd,
    limit: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }}).single('justificatifdomicile')

const uppingAvis = multer({
    storage: storageAvis,
    limit: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }}).single('avisfiscal')


const uppingRib = multer({
    storage: storageRib,
    limit: { fileSize: 1000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }}).single('rib')

const upload = {

    newUpId(req, res) {
        uppingId(req, res, (err) => {
            let { email } = req.body;
            if (err) { res.send(err) }
            else {
                if (req.file == undefined) { res.send(err) }
                else (Users.findOneAndUpdate({ email: email }
                    , { $push: { pi: `http://localhost:1337/private/upload/id/${req.file.filename}` }, }
                    , { new: true }
                    , (err, change) => {
                        if (err) { res.send(err) }
                        else { res.send(change) }
                    }))
            }
        })
    },

    newUpJdd(req, res) {
        uppingJdd(req, res, (err) => {
            let { email } = req.body;
            if (err) { res.send(err) }
            else (Users.findOneAndUpdate({ email: email }
                , { $push: { JDD: `http://localhost:1337/private/upload/jdd/${req.file.filename}` } }
                , { new: true }
                , (err, change) => {
                    if (err) { res.send(err) }
                    else { res.send(change) }
                }))
        })
    },

    newUpAvis(req, res) {
        uppingAvis(req, res, (err) => {

            let { email } = req.body;

            if (err) { res.send(err) }
            else {
                if (req.file == undefined) { res.send(err) }
                else (Users.findOneAndUpdate({ email: email }
                    , { $push: { avisFiscal: `http://localhost:1337/private/upload/avisfiscal/${req.file.filename}` } }
                    , { new: true }
                    , (err, change) => {
                        if (err) { res.send(err) }
                        else { res.send(change) }
                    }))
            }
        })
    },

    newUpRiB(req, res) {
        uppingRib(req, res, (err) => {

            let { email } = req.body;

            if (err) { res.send(err) }
            else {
                if (req.file == undefined) { res.send(err) }
                else (Users.findOneAndUpdate({ email: email }
                    , { $push: { picrib: `http://localhost:1337/private/upload/RiB/${req.file.filename}` } }
                    , { new: true }
                    , (err, change) => {
                        if (err) { res.send(err) }
                        else { res.send(change) }
                    }))
            }
        })
    },

    supprimerDoc(req, res, next) {
        let { email, data } = req.body;
        Users.findOneAndUpdate({ email: email },
            { $pull: { pi: data, JDD: data, avisFiscal: data, picrib: data, rib:data} }).then((data) => res.send(data))
    }
}

module.exports = upload;








