let express = require('express')
let bodyParser = require('body-parser')
const productsRouter = require('./routes/productsRoutes')
const orderRouter = require('./routes/orderRoutes')
const connectDB = require('./config/db')
require('dotenv').config()

let app = express()
app.use(bodyParser.json())

// Connect DB
connectDB();

app.use('/', productsRouter)
app.use('/', orderRouter)

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static('public'))
    app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))
} else {
    app.get('/', (req, res) => res.send('API Running'))
}

let PORT = process.env.PORT
app.listen(PORT || 5002, () => {
    console.log('Server Running on port 5002')
})

