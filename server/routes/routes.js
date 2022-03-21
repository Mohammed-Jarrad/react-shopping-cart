let express = require('express');
const Product = require('../models/productModel');
let router = express.Router();


router.get('/api/products', async (req, res) => {
    let products = await Product.find()
    res.send(products) 
})

router.post('/api/products', async (req, res) => {
    let newProduct = new Product(req.body)
    let saveP = await newProduct.save()
    res.send(saveP)
})

router.delete('/api/products/:id', async (req, res) => {
    let deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

module.exports = router