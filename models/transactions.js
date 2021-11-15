const mongoose = require('mongoose');

const transacSchema = mongoose.Schema({
  announceId:{type: String}, 
  userId:{type: String},
  token:{type: String}, 
  sc:{type: Number},
  title:{type:String},
  content:{type:String},
  price:{type:String},
  type:{type:String},
  image:{type:Array, required: false},
  created_at : Date 
});


const TransacModel = mongoose.model('Transactions', transacSchema)

module.exports = TransacModel;