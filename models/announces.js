const mongoose = require('mongoose');
const { Schema } = mongoose;

const announceSchema = mongoose.Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },
  city: { type: String, required: false },
  price: { type: Number, required: false },
  share_price: { type: Number, required: false },
  share_number: { type: Number, required: false },
  zip_code: { type: String, required: false },
  region: { type: String, required: false },
  type: { type: String, required: false },
  gross_rent_by_year: { type: Number, required: false },
  monthly_cost: { type: Number, required: false },
  options: { type: Array, required: false },
  bedrooms: { type: Number, required: false },
  surface: { type: Number, required: false },
  image: { type: Array, required: false },
  created: { type: String, default: new Date },
  historyTrans: [{ type: Schema.Types.ObjectId, ref: 'trans' }],
  historyProps: [{ type: Schema.Types.ObjectId, ref: 'props' }]
}, {
  collection: "Announces"
});

const AnnounceModel = mongoose.model('Announces', announceSchema)

module.exports = AnnounceModel;