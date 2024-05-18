const mongoose=require("mongoose");
const URI=process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDb=async()=>{
    try{
       const k=await mongoose.connect(URI);
        console.log("Connection successful to DB");
    }
    catch(error){
        console.error("Data connection failed");
        console.log(error)
        process.exit(0);
    } 
}
module.exports=connectDb