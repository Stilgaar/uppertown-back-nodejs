const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: { type: String}, 
  lastname: { type: String},
  brandname:{type: String, default:""},  
  isAdmin: {type: Boolean, default:false},
  email: { type: String},
  tel: {type: String},
  password: { type: String},
  userType:{type: String, default :"userType1"}, 
  pi: {type: String, default:""}, // piece identité
  JDD: {type: String, default: ""}, // justificatif domicile
  avisFiscal: {type: String, default: ""}, // avis fiscal
});

const UserModel = mongoose.model('Users', userSchema)

module.exports = UserModel
