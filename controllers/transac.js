const { Users, Alltrans } = require('../models/users');
const allTransacsModel = require('../models/allUserTransac')


const transac = {

    oneTransac(req, res, next) {

        let { lastname, id, annonceId, amountStableCoins } = req.body
        
        Alltrans.create({
            lastname: lastname,
            users: id,
            annonceId: annonceId,
            amountStableCoins: amountStableCoins
        })
            .then((rep) => res.send(rep))
            .catch(err => res.send(err))
    }
}

module.exports = transac;