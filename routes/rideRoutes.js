const express = require('express');
const { requestRide, getRideHistory, getRidesForRider, acceptRide } = require('../controllers/rideController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/request', authMiddleware, requestRide);
router.get('/history', authMiddleware, getRideHistory);
router.get('/rider/rides', authMiddleware, getRidesForRider);
router.put('/rider/accept/:id', authMiddleware, acceptRide);

module.exports = router;

