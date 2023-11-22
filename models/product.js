const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true,
    min: 0.01
  },
  category:{
    type: String,
    lowercase: true,
    enum: ['fruit','vegetable','dairy','pastries','mushrooms']
  },
  img :{
    type: String
  }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;