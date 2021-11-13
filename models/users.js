const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: { type: String}, 
  lastname: { type: String},
  brandname:{type: String, default:""},  
  isAdmin: {type: Boolean, default:false},
  email: { type: String},
  tel: {type: String},
  password: { type: String},
  rib: {type: Array, default:[]},
  adress: {type:String}, 
  userType:{type: String, default :"userType1"}, 
  pi: {type: Array, default:[]}, 
  JDD: {type: Array, default:[]}, 
  avisFiscal: {type: Array, default:[]}, 
  stableCoins: {type: Number, default: 0},
  picrib: {type:Array, default:[]},
  montant:{type:Array, default:[]},
  ancientMontants:{type:Array, default:[]},
  awaiting:{type:Boolean, default:false},
  awaitingEuro:{type: Boolean, default:false},
  montantEuro:{type:Array, default:[]},
  ancientMontantsEuro:{type:Array, default:[]}
});

const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel
