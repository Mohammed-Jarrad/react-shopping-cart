let mongoose = require('mongoose')
const orderSchema = require('../schema/orderSchema')

let Order = mongoose.model('Order', orderSchema)

module.exports = Order;

