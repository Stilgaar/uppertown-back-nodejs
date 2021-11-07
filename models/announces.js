const mongoose = require('mongoose');

const announceSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String }, 
  city: { type: String },
  price: { type: Number },
  share_price: { type: Number },
  share_number: { type: Number },
  zip_code: { type: String },
  region: { type: String },
  type: { type: String },
  gross_rent_by_year: { type: Number },
  monthly_cost: { type: Number },
  created_at : Date,
  image: {type: [String]},
  image1: { type: String, required:false },
  image2: { type: String, required:false },
  image3: { type: String, required:false },
 
  //gallery: {type: Array, required:false}
}, {
  collection: "Announces"
});


const AnnounceModel = mongoose.model('Announces', announceSchema)

module.exports = AnnounceModel;
