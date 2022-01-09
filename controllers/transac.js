const { Users, Alltrans } = require('../models/users');
const allTransacsModel = require('../models/allUserTransac')


const transac = {

    oneTransac(req, res, next) {

        let { lastname, id, annonceId, amountStableCoins } = req.body
        console.log(req.body)

        Alltrans.create({
            lastname: lastname,
            users: id,
            annonceId: annonceId,
            amountStableCoins: amountStableCoins
        })
            .then(() => res.send('Engeristré dans la BD'))
            .catch(err => res.send(err))
    }
}

module.exports = transac;