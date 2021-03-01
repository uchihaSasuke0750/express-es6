const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meta: {
    type: Number,
    required: true,
  },
  brands: {
    type: String,
    required: true,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: Category,
    },
  ],
  out_of_stock: {
    type: Number,
    required: true,
  },
});

module.exports = User = mongoose.model('ProductGroup', ProductGroupSchema);
