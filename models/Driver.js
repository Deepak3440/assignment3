const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    username: {
       type: String, required: true,
        unique: true },
    password: { 
      type: String, 
      required: true
     },
    carType: { 
      type: String, 
      required: true },
    carNumber: {
       type: String, 
       required: true
       },
       pickupLocation: {
         type: String,
          required: true
         },
    destinationLocation: { 
      type: String,
       required: true },
    
});

module.exports = mongoose.model('Driver', DriverSchema);
