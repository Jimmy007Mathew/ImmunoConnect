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
const cors = require("cors");

app.use(cors({
    origin: "https://immunoconnect.vercel.app", // Allow only your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));


// Use the MongoDB URL from .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/users', userRoutes);
app.use('/api/children', childRoutes);
app.use('/api/health-centers', healthCenterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vaccinations', vaccinationRoutes);

const PORT = process.env.PORT || 10000; // Use Render's default port (10000)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
