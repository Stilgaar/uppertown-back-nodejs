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
  image: { type: [String] },
}, {
  collection: "Announces"
});


const AnnounceModel = mongoose.model('Announces', announceSchema)

module.exports = AnnounceModel;
