const Ride = require('../models/Driver');

const requestRide = async (req, res) => {
  try {
    const ride = new Ride({ user: req.user.id, details: req.body.details });
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ error: 'Failed to request ride' });
  }
};

const getRideHistory = async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.user.id }).populate('user rider');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get ride history' });
  }
};

const getRidesForRider = async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'requested' }).populate('user');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get rides' });
  }
};

const acceptRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (ride && ride.status === 'requested') {
      ride.status = 'accepted';
      ride.rider = req.user.id;
      await ride.save();
      res.json(ride);
    } else {
      res.status(400).json({ error: 'Ride not available' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept ride' });
  }
};

module.exports = { requestRide, getRideHistory, getRidesForRider, acceptRide };
