const express = require('express');
const router = express.Router();
const HealthcareProvider = require('../models/HealthcareProvider');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authenticate = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// Get pending healthcare providers
router.get('/pending-providers', authenticate, verifyAdmin, async (req, res) => {
    try {
        const providers = await HealthcareProvider.find({ isVerified: false });
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify healthcare provider
router.patch('/verify-provider/:id', authenticate, verifyAdmin, async (req, res) => {
    try {
        const providerId = req.params.id;

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(providerId)) {
            return res.status(400).json({ message: 'Invalid provider ID' });
        }

        const provider = await HealthcareProvider.findByIdAndUpdate(
            providerId,
            { isVerified: true },
            { new: true }
        );

        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        res.json({ message: 'Provider verified successfully' });
    } catch (error) {
        console.error('Error verifying provider:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = router;