const express = require('express');
const router = express.Router();
const HealthcareProvider = require('../models/HealthcareProvider');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Healthcare Provider Signup
router.post('/healthcare/signup', async (req, res) => {
    try {
        const { address, email, password, hospitalName, licenseNumber } = req.body;

        const existingProvider = await HealthcareProvider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ message: 'Provider already exists' });
        }

        const newProvider = new HealthcareProvider({
            address,
            email,
            password,
            hospitalName,
            licenseNumber
        });

        await newProvider.save();
        res.status(201).json({ message: 'Signup request submitted for admin approval' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Healthcare Provider Login
router.post('/healthcare/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const provider = await HealthcareProvider.findOne({ email });
        if (!provider || !(await bcrypt.compare(password, provider.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!provider.isVerified) {
            return res.status(403).json({ message: 'Account not verified by admin' });
        }

        const token = jwt.sign(
            { id: provider._id, role: 'healthcare', hospitalName: provider.hospitalName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }

        const token = jwt.sign(
            { id: admin._id, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// Get pending healthcare providers
router.get('/pending-providers', verifyAdmin, async (req, res) => {
    try {
        const providers = await HealthcareProvider.find({ isVerified: false });
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify healthcare provider
router.patch('/verify-provider/:id', verifyAdmin, async (req, res) => {
    try {
        const provider = await HealthcareProvider.findByIdAndUpdate(
            req.params.id,
            { isVerified: true },
            { new: true }
        );

        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        res.json({ message: 'Provider verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;