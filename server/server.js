let express = require('express')
// let mongoose = require('mongoose')
let bodyParser = require('body-parser')
const productsRouter = require('./routes/productsRoutes')
const orderRouter = require('./routes/orderRoutes')
const connectDB = require('./config/db')

let app = express()
app.use(bodyParser.json())
app.use('/', productsRouter)
app.use('/', orderRouter)


// Connect DB
connectDB();

app.listen('5002', () => {
    console.log('Server Running on port 5002')
})

