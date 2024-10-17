const Reservation=require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const { date, time, location, vehicle_no, mileage, message} = req.body;
        const username = req.user.username;

        const newReservation = await Reservation.create({
            date, time, location, vehicle_no, mileage, message, username
        });
        
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
};


exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({
            where: { username: req.user.username }
        });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            where: { booking_id: req.params.id, username: req.user.username }
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.destroy();
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};