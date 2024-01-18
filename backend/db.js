const mongoose = require('mongoose')
const mongoUri = "mongodb://localhost:27017/noteswift"

const connectToMongo = async () =>{
    try{
        mongoose.connect(mongoUri)
        console.log('mongo connected')
    }catch(error){
        console.log('error'+error)
    }
}
module.exports = connectToMongo;