let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
const router = require('./routes/routes')

let app = express()
app.use(bodyParser.json())
app.use('/', router)

let connectionString = 'mongodb://localhost/react-shopping-cart'
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connection Done'))
    .catch(err => console.log(err))

app.listen('5002', () => {
    console.log('Server Running on port 5002')
})

