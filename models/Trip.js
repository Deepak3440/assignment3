const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    userId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User',
          required: true
         },
    driverId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Driver', 
          required: true 
        },
    status: { 
        type: String,
        default: 'pending'
     },
    time: { 
        type: Date, default: Date.now 
    }
});

module.exports = mongoose.model('Trip', TripSchema);
