const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: { type: String}, 
  lastname: { type: String},
  brandname:{type: String, default:""},  
  isAdmin: {type: Boolean, default:false},
  email: { type: String},
  tel: {type: String},
  password: { type: String},
  rib: {type: Array},
  adress: {type:String}, 
  userType:{type: String, default :"userType1"}, 
  pi: {type: Array}, 
  JDD: {type: Array}, 
  avisFiscal: {type: Array}, 
  stableCoins: {type: Number, default: 0},
  picrib: {type:Array},
  montant:{type:Array},
  ancientMontants:{type:Array},
  awaiting:{type:Boolean, default:false},
  awaitingEuro:{type: Boolean, default:false},
  montantEuro:{type:Array},
  ancientMontantsEuro:{type:Array}
});

const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel
