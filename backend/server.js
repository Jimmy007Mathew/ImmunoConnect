require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route files
const userRoutes = require('./routes/userRoutes');
const childRoutes = require('./routes/childRoutes');
const healthCenterRoutes = require('./routes/healthCenterRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes');

const app = express();
app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: "https://immunoconnect.vercel.app", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Define API Routes
app.use('/api/users', userRoutes);
app.use('/api/children', childRoutes);
app.use('/api/health-centers', healthCenterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vaccinations', vaccinationRoutes);

// Vercel requires exporting the app
module.exports = app;