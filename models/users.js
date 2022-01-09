const mongoose = require('mongoose');
const { Schema } = mongoose;

const allTransSchema = new Schema({
  lastname: { type: String },
  annonceId: { type: String },
  amountStableCoins: { type: String },
  users: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
});

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  brandname: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  email: { type: String },
  tel: { type: String },
  password: { type: String },
  rib: { type: Array, default: [] },
  adress: { type: String },
  userType: { type: String, default: "userType1" },
  pi: { type: Array, default: [] },
  JDD: { type: Array, default: [] },
  avisFiscal: { type: Array, default: [] },
  stableCoins: { type: Number, default: 0 },
  picrib: { type: Array, default: [] },
  montant: { type: Array, default: [] },
  ancientMontants: { type: Array, default: [] },
  awaiting: { type: Boolean, default: false },
  awaitingEuro: { type: Boolean, default: false },
  montantEuro: { type: Array, default: [] },
  ancientMontantsEuro: { type: Array, default: [] },
  allTrans: { type: mongoose.Schema.Types.ObjectId, ref: 'Alltrans'}
});

const Users = mongoose.model('Users', userSchema, 'Users')
const Alltrans = mongoose.model('Alltrans', allTransSchema, 'Alltrans')

module.exports = { Users, Alltrans }