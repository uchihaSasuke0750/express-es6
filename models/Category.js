const mongoose = require('mongoose');

const SubCategory = require('./SubCategory').schema

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  SubCategory: [SubCategory],
});

module.exports = Category = mongoose.model('Category', CategorySchema);
