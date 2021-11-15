const mongoose = require('mongoose');

const propertiesSchema = mongoose.Schema({
  idUser:{type:String, required:false},
  announceId:{type:String, required:false},
  title: { type: String, required:false },
  content: { type: String, required:false }, 
  city: { type: String, required:false },
  price: { type: Number, required:false },
  share_price: { type: Number, required:false },
  totalToken: { type: Number, required:false },
  zip_code: { type: String, required:false },
  region: { type: String, required:false },
  type: { type: String, required:false},
  gross_rent_by_year: { type: Number, required:false},
  monthly_cost: { type: Number, required:false},
  options:{type:Array, required:false},
  bedrooms:{type:Number, required:false},
  surface:{type:Number, required:false},
  created_at : Date,
  image: {type: Array, required:false}
});


const propertiesModel = mongoose.model('Properties', propertiesSchema)

module.exports = propertiesModel;
