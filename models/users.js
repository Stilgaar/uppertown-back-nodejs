const mongoose = require('mongoose');
const { Schema } = mongoose;

// shema pour toutes les transactions séparés. 
const transSchema = new Schema({
  annonceId: { type: String },
  amountStableCoins: { type: Number },
  users: { type: Schema.Types.ObjectId, ref: 'Users' },
});

// schema pour le nombre de parts dans le bien
const propSchema = new Schema({
  annonceId: { type: String },
  amountStableCoins: { type: Number },
  users: { type: Schema.Types.ObjectId, ref: 'props' },
})


// schema pour l'user
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
  trans: [{ type: Schema.Types.ObjectId, ref: 'trans' }],
  props: [{ type: Schema.Types.ObjectId, ref: 'props' }]

});

const trans = mongoose.model('trans', transSchema)
const Users = mongoose.model('Users', userSchema)
module.exports = { Users, trans }