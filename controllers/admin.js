const Users = require('../models/users');

const admin = {

    verifPi(req, res, next) {
        let email = req.body;
        Users.findOneAndUpdate({ email: email.data}
            , { $set: { userType: "userType2" } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },

    verifJDD(req, res, next) {
        let email = req.body;
            Users.findOneAndUpdate({ email: email.data}
            , { $set: { userType: "userType3" } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },

    verifAVIS(req, res, next) {
        let email = req.body;
        Users.findOneAndUpdate({ email: email.data}
            , { $set: { userType: "userType4" } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },

    goAdmin(req, res, next) {
        let email = req.body;
        Users.findOneAndUpdate({ email: email.data}
            , { $set: { isAdmin: true } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },

    noAdmin(req, res, next) {
        let email = req.body;
        Users.findOneAndUpdate({ email: email.data}
            , { $set: { isAdmin: false } }
            , { new: true }, (err, newType) => {
                if (err) { res.send(err) }
                else { res.send(newType) }
            }
        )
    },


}

module.exports = admin;