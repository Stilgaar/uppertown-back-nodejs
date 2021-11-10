const mongoose = require('mongoose');

const transacSchema = mongoose.Schema({
  announceId: { type: String}, 
  userId: { type: String},
  token:{type: String},  
  sc: {type: Number},
  created_at : Date 
});


const TransacModel = mongoose.model('Transactions', transacSchema)

module.exports = TransacModel;