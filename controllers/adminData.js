const AdminModel = require('../models/admin');

const adminData = {

    addRib(req, res, next) {
        console.log(req.body)

        let { titulaire, domiciliation, iban, codeBanque, codeGuichet, numeroCompte, clefRib, bicSwift } = req.body;

        if (!titulaire || !domiciliation || !iban || !codeBanque || !codeGuichet || !numeroCompte || !clefRib || !bicSwift) {
            return res.send("empty");
        }

        AdminModel.findOneAndUpdate({ lerib: "01" },
            {
                $set: {
                    titulaire: titulaire,
                    domiciliation: domiciliation,
                    iban: iban,
                    codeBanque: codeBanque,
                    codeGuichet: codeGuichet,
                    numeroCompte: numeroCompte,
                    clefRib: clefRib,
                    bicSwift: bicSwift
                }
            }
            , { new: true }
            , (err, updatedRib) => {
                if (err) {
                    res.send(err);
                }
                if (!updatedRib) {
                    AdminModel.create({
                        titulaire,
                        domiciliation,
                        iban,
                        codeBanque,
                        codeGuichet,
                        numeroCompte,
                        clefRib,
                        bicSwift
                    }).then(() => res.send("NEWRIB"))
                        .catch((err) => res.send(err))
                } else { res.send("UPDATE RIB") }
            })
    },

    getRib(req, res, next) {
        AdminModel.find()
            .then((rib) => res.status(200).json(rib))
            .catch((err) => res.send)
    },

    getHostURL(req, res, next) {
        res.send("url")
    },

    getHostURLLOCAL(req, res, next) {
        res.send("local")
    },


    addAdminText(req, res, next) {
        let { maintitle, maincontent, color } = req.body;

        return AdminModel.findOneAndUpdate({ mainpage: "01" },
            {
                $set: {
                    maintitle: maintitle,
                    maincontent: maincontent,
                    color: color
                }
            }
            , { new: true }
            , (err, updateMain) => {
                if (err) { res.send(err) }
                if (!updateMain) {
                    AdminModel.create({
                        maintitle,
                        maincontent,
                        color,
                    }).then((newMain) => res.send(newMain))
                        .catch((err) => res.send(err))
                }
                else { res.send(updateMain) }
            }
        )
    }
}

module.exports = adminData;