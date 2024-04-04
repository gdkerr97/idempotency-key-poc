const express = require('express')
const { create } = require('../controllers/transactionController')
const router = express.Router()

router.post('/', create)

module.exports = router