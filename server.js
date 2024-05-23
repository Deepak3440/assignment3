const express = require('express');
const mongoose = require('mongoose');
const Driver=require('./models/Driver');
const User=require('./models/User');
const Trip=require('./models/Trip');
const cors = require('cors');


// const connectToMongoDB=require('./db/connectToMongoDB');
 const authRoutes = require('./routes/authRoutes');
// const rideRoutes = require('./routes/rideRoutes');
const url='mongodb://localhost:27017/Uber';



const connectToMongoDB=async()=>{
    try{
        await mongoose.connect(url);
        console.log("connected to MongoDb");
    }
    catch(err){
        console.log("error connecting to MongoDb");
    }
}
connectToMongoDB();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
// app.use('/api/rides', rideRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
