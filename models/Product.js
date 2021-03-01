const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductGroup = require('./ProductGroup');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  offer_value: {
    type: Number,
    required: true,
  },
  offer_type: {
    type: Number,
    required: true,
  },
  product_group: {type: Schema.Types.ObjectId, ref: ProductGroup , required: true},
});

module.exports = Product = mongoose.model('Product', ProductSchema);
