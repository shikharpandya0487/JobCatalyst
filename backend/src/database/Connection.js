// const mongoose = require("mongoose");
// const DB_NAME = require("../Constants.js");


// module.exports.connectDB = async () => { 
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGODB connection FAILED ", error);
//         process.exit(1)  
//     }
// }


const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/JobCatalyst";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}) .then(()=>console.log("database connected"))
.catch((err)=>console.log("errr",err))        

}

module.exports = connectToMongo;
