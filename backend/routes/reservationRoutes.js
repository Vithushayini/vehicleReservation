const express = require('express');
const { createReservation, getReservations, deleteReservation } = require('../controllers/reservationController');
// const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/reserve',  createReservation);
router.get('/reservations',  getReservations);
router.delete('/reservations/:id', deleteReservation);

module.exports = router;
