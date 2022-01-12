const { Users, trans, props } = require('../models/users');
const Announces = require("../models/announces");

// ce qui se passe au moment du click lorsque l'on achète des SC sur un bien immo
let date = new Date;

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
                        if (err) { console.log(1, err) }
                        else { console.log('**** 1 nouvelle transaction crée') }
                    })

                Announces.findOneAndUpdate({ _id: annonceId }
                    , {
                        $push: { historyTrans: rep._id },
                        $inc: { share_number: - Number(rep.amountStableCoins) }
                    }
                    , { new: true }
                    , (err, pushed) => {
                        if (err) { console.log(3, err) }
                        else { console.log('**** 2 transaction sauvgardée dans l\'annonce') }
                    })
            }).catch(err => console.log(5, err))

        // fonction créant une nouvelle proprieté si la personne n'en avait pas déjà des parts. 
        props.findOneAndUpdate({ annonceId: annonceId }
            , {
                $inc: { amountStableCoins: + Number(amountStableCoins) }
            }
            , { new: true }
            , (err, newprop) => {
                if (err) { console.log(6, err) }
                if (!newprop) {
                    props.create({
                        annonceId,
                        amountStableCoins,
                        users: id
                    }).then((rep) => {
                        Users.findOneAndUpdate({ _id: id }
                            , {
                                $push: { props: rep._id },
                            }
                            , { new: true }
                            , (err, done) => {
                                if (err) { console.log(7, err) }
                                else { console.log('**** 3 transaction ajoutée au props crée') }
                            })

                        Announces.findOneAndUpdate({ _id: annonceId }
                            , {
                                $push: { historyProps: rep._id }
                            }
                            , { new: true }
                            , (err, pushed) => {
                                if (err) { console.log(9, err) }
                                else { console.log('**** 4 Prop sauvgardée dans l\'annonce') }
                            })
                    }).catch(err => console.log(10, err))
                } else { res.send('done') }
            })
    }
}

module.exports = transac;