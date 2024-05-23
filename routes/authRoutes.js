const express = require('express');
const { register, login, getTrips, acceptRide, rejectRide, cancelRide, getTripsUser, getDriverDetails } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/getTrips', getTrips);
router.post('/acceptRide/:tripId', acceptRide);
router.post('/rejectRide/:tripId', rejectRide);
router.post('/cancelRide/:tripId', cancelRide);
router.post('/getTripsUser', getTripsUser);
router.get('/drivers/:driverId', getDriverDetails);

router.post('/login', login);

module.exports = router;
