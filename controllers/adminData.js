const AdminModel = require('../models/admin');

const adminData = {

    addRib(req, res, next) {
        let { titulaire, domiciliation, iban, codeBanque, codeGuichet, numeroCompte, clefRib, bicSwift } = req.body;
        if (!titulaire || !domiciliation || !iban || !codeBanque || !codeGuichet || !numeroCompte || !clefRib || !bicSwift) { return res.send("empty") }

        return AdminModel.findOneAndUpdate({ lerib: "01" },
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
            , (err, updatedrib) => {
                if (err) AdminModel.create({
                    lerib,
                    titulaire,
                    domiciliation,
                    iban,
                    codeBanque,
                    codeGuichet,
                    numeroCompte,
                    clefRib,
                    bicSwift
                }).then((newrib) => res.send(newrib))
                    .catch((err) => res.send(err))
                else { res.send(updatedrib); }
            })
    },

    getRib(req, res, newt) {
        AdminModel.find()
            .then((rib) => res.status(200).json(rib))
            .catch((err) => res.send)
    }

}

module.exports = adminData;