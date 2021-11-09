const mongoose = require('mongoose');

const transacSchema = mongoose.Schema({
  announceId: { type: Number}, 
  userId: { type: Number},
  token:{type: Number},  
  sc: {type: Number},
  date: Date
});

const TransacModel = mongoose.model('Transactions', transacSchema)

module.exports = TransacModel