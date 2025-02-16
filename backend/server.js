require('dotenv').config(); // Load .env file

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const childRoutes = require('./routes/childRoutes');
const healthCenterRoutes = require('./routes/healthCenterRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());

// ✅ Allow multiple frontend URLs
app.use(cors({
    origin: [
        "https://mytest-front.vercel.app",
        "https://immuno-connect.vercel.app"
    ],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true // Allow cookies if needed
}));
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/users', userRoutes);
app.use('/api/children', childRoutes);
app.use('/api/health-centers', healthCenterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vaccinations', vaccinationRoutes);

// ✅ Export the app for Vercel
module.exports = app;
