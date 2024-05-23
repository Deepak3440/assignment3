const mongoose=require('mongoose');
const url="mongodb+srv://thakurdeep3440:LGbw5Y0svD8ywnPk@cluster0.wohjyfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(url);
        console.log("connected to MongoDb");
    }
    catch(err){
        console.log("error connecting to MongoDb");
    }
}
module.exports=connectToMongoDB;