const mongoose = require('mongoose');
const MSchema = mongoose.Schema;

const productSchema = MSchema({
  name: String,
  price: Number,
  description: String,
});

module.exports = mongoose.model('Product', productSchema);
