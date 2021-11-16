const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
  announceId:{type: String}, 
  userId:{type: String},
  token:{type: String}, 
  sc:{type: Number},
  created_at : Date 
});


const SalesModel = mongoose.model('Sales', salesSchema)

module.exports = SalesModel;    