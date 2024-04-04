require('dotenv').config()
const express = require('express')
const db = require('../src/config/db')
const {redis} = require('../src/config/redis')
const transactionRouter = require('../src/routes/transactionRoute')

var app = express()
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/api/v1/transaction', transactionRouter)

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => {
    console.log(`Server listening on port ${port}`)
    db()
    redis()
})