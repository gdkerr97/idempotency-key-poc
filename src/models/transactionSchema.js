const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema)