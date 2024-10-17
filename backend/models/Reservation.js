const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reservation = sequelize.define('Reservation', {
    booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicle_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync({ force: false }).then(() => {
    console.log('Tables created');
});

module.exports = Reservation;


