const { Users, trans, props } = require('../models/users');

// ce qui se passe au moment du click lorsque l'on achète des SC sur un bien immo

const transac = {

    // une fonction pour les diriger tous !
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
                        if (err) { err }
                        else { console.log('nouvelle transaction crée') }
                    })

            })
            .catch(err => res.send(err))

        // fonction créant une nouvelle proprieté si la personne n'en avait pas déjà des parts. 
        props.findOneAndUpdate({ annonceId: annonceId }
            , {
                $inc: { amountStableCoins: + Number(amountStableCoins) }
            }
            , { new: true }
            , (err, newprop) => {
                if (err) { res.send(err) }
                if (!newprop) {
                    props.create({
                        annonceId,
                        amountStableCoins,
                        users: id
                    })
                        .then((rep) => {
                            Users.findOneAndUpdate({ _id: id }
                                , {
                                    $push: { props: rep._id },
                                }
                                , { new: true }
                                , (err, done) => {
                                    if (err) { err }
                                    else {
                                        console.log('transaction ajoutée au props crée')
                                    }
                                })
                        })
                        .catch(err => res.send(err))
                } else {
                    console.log('nouveau bien dans props');
                    res.send("done")
                }
            }
        )
    }
}

module.exports = transac;