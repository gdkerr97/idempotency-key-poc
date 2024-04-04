var crypto = require('crypto');
const transactionModel = require('../models/transactionSchema');
const {redisClient} = require('../config/redis');

exports.create = async(req, res) =>{

    if(!Object.keys(req.body).length){
        res.status(400).json({message: "Request cannot be empty!"})
    }else if(!req.body.idempotency || req.body.idempotency == null){
        res.status(400).json({message: "You need idempotency key!"})
    }else if(!req.body.customer || !req.body.description || !req.body.currency || !req.body.amount){
        res.status(400).json({message: "You need transaction body!"})
    }else if(req.body.amount < 0 || typeof req.body.amount !== "number"){
        res.status(400).json({message: "Amount must be a positive number!"})
    }else{

        // hashing idempotency key with sha256
        const hash = crypto.createHash('sha256').update(req.body.idempotency).digest('hex');

        // check if hashed idempotency key is present in Redis
        const redisValue = await redisClient.get(hash);

        if(redisValue == req.body.idempotency){
            res.status(422).json({message: "Request already entered"})
        }else{
            redisClient.set(hash, req.body.idempotency)
            const transaction = new transactionModel({
                customer: req.body.customer,
                description: req.body.description,
                currency: req.body.currency,
                amount: req.body.amount
            })
            transaction.save()
            res.status(201).json({message: "Transaction saved!"})
        }
    }
}