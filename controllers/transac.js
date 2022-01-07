const { Users } = require('../models/users');
const allTransacsModel = require('../models/allUserTransac')


const transac = {

    oneTransac(req, res, next) {

        let { lastname, _id, annonceId, amountStableCoins } = req.body

        Users.findOne({ _id: _id })
            .then(reccord => {
                reccord.allTrans.push({ annonceId, amountStableCoins })
                reccord.save()
            })

        allTransacsModel.create({
            user: lastname,
            userId: _id,
            annId: annonceId,
            amountStableCoins: amountStableCoins
        })
            .then(() => res.send('Engeristré dans la BD'))
            .catch(err => res.send(err))
    }
}

module.exports = transac;