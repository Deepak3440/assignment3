const User = require('../models/User');
const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
  try {
    const { pickupLocation, destinationLocation, userId } = req.body;

    // Fetch riders from Rider collection where the pickup location matches
    const riders = await Driver.find({ pickupLocation });

    // Check if riders were found
    if (!riders || riders.length === 0) {
      return res.status(404).json({ message: 'No riders found at the specified pickup location.' });
    }

    // Prepare the data for the Trip collection
    const tripsData = riders.map(rider => ({
      userId,
      driverId: rider._id, // Assuming the primary key of the Rider collection is '_id'
      status: 'pending',
      time: new Date()
    }));

    // Store the data in the Trip collection
    await Trip.insertMany(tripsData);

    // Send a success response
    res.status(201).json({ message: 'Trips created successfully.', trips: tripsData });
  } catch (error) {
    console.error('Error creating trips:', error);
    res.status(500).json({ message: 'An error occurred while creating trips.' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Username:', username);

    // Check if the user exists in the User collection
    const user = await User.findOne({ username });
    console.log('User:', user);

    if (user) {
      // Check if the password matches
      const passwordMatch = user.password===password?true:false;
      if (passwordMatch) {
        // Send a success response
        return res.status(200).json({ role: 'user' });
      } else {
        console.log('User password does not match');
      }
    } else {
      console.log('User not found in User collection');
    }

    // Check if the user exists in the Driver collection
    const driver = await Driver.findOne({ username });
    console.log('Driver:', driver);

    if (driver) {
      // Check if the password matches
      const passwordMatch = driver.password===password?true:false;
      if (passwordMatch) {
        // Send a success response
        return res.status(200).json({ role: 'driver' });
      } else {
        console.log('Driver password does not match');
      }
    } else {
      console.log('User not found in Driver collection');
    }

    // If no match is found, respond with an error
    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    // Handle internal server error
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getTrips = async (req, res) => {
  try {
    const { driverId } = req.body;

    // Fetch trips from Trip collection where riderId and status match
    const trips = await Trip.find({ driverId,  status: { $in: ['pending', 'accepted'] }});

    // Send the found trips as the response
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  
const acceptRide = async (req, res) => {
  try {
    const { tripId } = req.params;

    // Find the trip by _id and update its status to 'accepted'
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { status: 'accepted' },
      { new: true } // This option returns the modified document
    );

    // If the trip is not found, send a 404 response
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Send the updated trip as the response
    res.status(200).json(trip);
  } catch (error) {
    console.error('Error updating trip status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTripsUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch trips from Trip collection where riderId and status match
    const trips = await Trip.find({ userId, status :'accepted'});

    // Send the found trips as the response
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getDriverDetails = async (req, res) => {
  try {
    const { driverId } = req.params;
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error('Error fetching driver details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const rejectRide = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findByIdAndUpdate(tripId, { status: 'rejected' }, { new: true });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    console.error('Error updating trip status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const cancelRide = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await Trip.findByIdAndUpdate(tripId, { status: 'canceled' }, { new: true });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    console.error('Error updating trip status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { register, login, getTrips, acceptRide, rejectRide, cancelRide, getTripsUser, getDriverDetails };
