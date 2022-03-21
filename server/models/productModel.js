let mongoose = require('mongoose')
const productSchema = require('../schema/productSchema')

let Product = mongoose.model('Product', productSchema)

module.exports = Product;