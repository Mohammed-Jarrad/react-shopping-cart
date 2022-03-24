let express = require('express')
let router = express.Router()
let Order = require('../models/orderModel')

router.get('/api/orders', async (req, res) => {
    let order = await Order.find()
    res.send(order)
})

router.post('/api/orders', async (req, res) => {
    let order = await new Order(req.body).save()
    res.send(order)
})

router.delete('/api/orders/:id', async (req, res) => {
    let deletedOrder = await Order.findByIdAndDelete(req.params.id)
    res.send(deletedOrder)
})

module.exports = router;

