const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({

    lerib: {type: String, default: "01"},
    iban: { type: String , default :""},
    codeBanque: { type: String , default :"" },
    codeGuichet: { type: String , default :"" },
    numeroCompte: { type: String , default :"" },
    clefRib: { type: String , default :""},
    bicSwift: { type: String , default :""},
    titulaire: { type: String , default :""},
    domiciliation: { type: String , default :""},
    mainpage:{type:String, default: "01"},
    maintitle: {type:String, default:""},
    maincontent: {type: String, default: ""},
    color: {type: String, default:"#1b3563" }

});
const AdminModel = mongoose.model('Admin', adminSchema)

module.exports = AdminModel