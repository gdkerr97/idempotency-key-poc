const { createClient } = require('redis')

const redisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

const redis = async() =>{
    
    try{
        await redisClient.connect().then(() => console.log('CONNECTED TO REDIS DB'))

    }catch(error){
        console.log('Redis Client Error', error)
    }
}

module.exports = {redis, redisClient}