const mongoose = require('mongoose')

const db = async() =>{

    try{
        await mongoose.connect(process.env.MONGODB)
        .then(() =>{
            console.log('CONNECTED TO MONGODB')
        })
    }catch(error){
        console.log(error)
    }
}

module.exports = db