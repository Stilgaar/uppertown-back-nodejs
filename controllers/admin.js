const { Users } = require('../models/users');

const admin = {

    verifPi(req, res, next) {
        Users.findOneAndUpdate({ _id: req.params.id }
            , { $set: { userType: "userType2" } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },

    verifJDD(req, res, next) {
        Users.findOneAndUpdate({ _id: req.params.id }
            , { $set: { userType: "userType3" } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },

    verifAVIS(req, res, next) {
        Users.findOneAndUpdate({ _id: req.params.id }
            , { $set: { userType: "userType4" } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },

    goAdmin(req, res, next) {
        Users.findOneAndUpdate({ _id: req.params.id }
            , { $set: { isAdmin: true } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },

    noAdmin(req, res, next) {
        Users.findOneAndUpdate({ _id: req.params.id }
            , { $set: { isAdmin: false } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },


}

module.exports = admin;