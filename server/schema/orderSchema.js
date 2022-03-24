let mongoose = require('mongoose')

let orderSchema = mongoose.Schema({
    name: String,
    email: String,
}, {
    timestamps: true,
}) 

module.exports = orderSchema;