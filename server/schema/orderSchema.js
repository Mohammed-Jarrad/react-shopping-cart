let mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
    name: String,
    email: String,
    orderInfo: [{ title: String, quantity: String }]
}, {
    timestamps: true,
})

module.exports = orderSchema;