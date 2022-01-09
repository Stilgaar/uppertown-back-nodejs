const mongoose = require('mongoose')

const allTransacs = mongoose.Schema({
    user: { type: String },
    userId: { type: String },
    annId: { type: String },
    amountStableCoins: { type: String }
})

const allTransacsModel = mongoose.model('allTransacs', allTransacs)

module.exports = allTransacsModel