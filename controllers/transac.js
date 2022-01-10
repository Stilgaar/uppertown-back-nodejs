const { Users, trans } = require('../models/users');

// ce qui se passe au moment du click lorsque l'on achète des SC sur un bien immo

const transac = {

    oneTransac(req, res, next) {

        let { id, annonceId, amountStableCoins } = req.body
        // création d'une transaction
        trans.create({
            annonceId: annonceId,
            amountStableCoins: amountStableCoins,
            users: id
        })
            .then((rep) => {
                // utilisation de l'id de la transaction pour la push dans un tableau de l'user
                // en même temps le nombre de SC investis est déduit du portefeuil de l'user
                Users.findOneAndUpdate({ _id: id }
                    , {
                        $push: { trans: rep._id },
                        $inc: { stableCoins: - Number(rep.amountStableCoins) }
                    }
                    , { new: true }
                    , (err, pushed) => {
                        if (err) { res.send(err) }
                        else { res.send(pushed) }
                    })
            })
            .catch(err => res.send(err))
    }
}

module.exports = transac;

// find one and update => rechercher l'annonce avec l'id
// s'il trouve il rajoute le SC à ceux qu'il a déjà
// s'il trouve pas id il tombe dans l'erreur
// il crée une nouvelle entrée