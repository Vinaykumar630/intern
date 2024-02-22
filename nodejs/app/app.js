const express = require('express');
const cors = require('cors');
const trackingRoutes = require('./routes/trackingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authenticate = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', trackingRoutes);
app.use('/api/admin', authenticate, adminRoutes); // Use the authenticate middleware for admin routes

module.exports = app;
