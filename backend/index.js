const express = require('express');
const helmet = require('helmet');
const reservationRoutes = require('./routes/reservationRoutes');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());

// Routes
app.use('/api', reservationRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
