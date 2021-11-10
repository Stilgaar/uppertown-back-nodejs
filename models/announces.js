const mongoose = require('mongoose');

const announceSchema = mongoose.Schema({
<<<<<<< HEAD
  title: { type: String },
  content: { type: String }, 
  bedrooms: { type: String },
  surface: { type: String },
  city: { type: String },
  price: { type: Number },
  share_price: { type: Number },
  share_number: { type: Number },
  zip_code: { type: String },
  region: { type: String },
  type: { type: String },
  gross_rent_by_year: { type: Number },
  monthly_cost: { type: Number },
  image: { type: [String] },
=======
  title: { type: String, required:false },
  content: { type: String, required:false }, 
  city: { type: String, required:false },
  price: { type: Number, required:false },
  share_price: { type: Number, required:false },
  share_number: { type: Number, required:false },
  zip_code: { type: String, required:false },
  region: { type: String, required:false },
  type: { type: String, required:false},
  gross_rent_by_year: { type: Number, required:false},
  monthly_cost: { type: Number, required:false},
  options:{type:Array},
  bedrooms:{type:Number},
  surface:{type:Number},
  created_at : Date,
  image: {type: Array, required:false},
  /*image2: { type: String, required:false },
  image3: { type: String, required:false },
  image4: { type: String, required:false },*/
 
  //gallery: {type: Array, required:false}
>>>>>>> 68af133c0d96d5c526addc15b5b170e5f97b7390
}, {
  collection: "Announces"
});


const AnnounceModel = mongoose.model('Announces', announceSchema)

module.exports = AnnounceModel;
