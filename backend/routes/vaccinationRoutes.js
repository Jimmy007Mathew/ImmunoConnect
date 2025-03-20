const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Child = require('../models/Child');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});



// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');


    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {

        res.status(401).json({ message: 'Token is not valid' });
    }
};



// Hospital verification middleware
const verifyHospital = (req, res, next) => {


    if (!req.user || req.user.role !== 'healthcare') {
        return res.status(403).json({ message: 'Hospital access required' });
    }
    next();
};

router.post('/send-otp/:vaccinationId', authenticate, verifyHospital, async (req, res) => {
    try {
        const { vaccinationId } = req.params;

        // Find the child and vaccination
        const child = await Child.findOne({ 'vaccinations._id': vaccinationId });
        if (!child) {
            return res.status(404).json({ message: 'Child or vaccination not found' });
        }

        const vaccination = child.vaccinations.id(vaccinationId);

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpExpires = new Date(Date.now() + 300000); // 5 minutes from now

        // Save OTP and expiration time
        vaccination.vaccineOTP = otp;
        vaccination.otpExpires = otpExpires;
        await child.save();

        // Send OTP to parent's email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: child.parentEmail,
            subject: 'Vaccination Verification OTP',
            text: `Your OTP for verifying the vaccination is: ${otp}. This OTP will expire in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Search for parent by email and get their children
router.get('/search-parent', authenticate, verifyHospital, async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const children = await Child.find({ parentEmail: email })
            .populate('parent', 'name email')
            .select('name dateOfBirth gender vaccinations');

        if (children.length === 0) {
            return res.status(404).json({ message: 'No children found for this parent' });
        }

        res.json(children);
    } catch (error) {

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.patch('/verify/:id', authenticate, verifyHospital, async (req, res) => {
    try {
        const child = await Child.findOne({ 'vaccinations._id': req.params.id });

        if (!child) {
            return res.status(404).json({ message: 'Child or vaccination not found' });
        }

        const vaccination = child.vaccinations.id(req.params.id);

        // Check if OTP is valid
        const now = new Date();
        if (
            !vaccination.vaccineOTP ||
            now > new Date(vaccination.otpExpires)
        ) {
            return res.status(400).json({ message: 'OTP is invalid or has expired' });
        }

        // Mark as verified
        vaccination.verified = true;
        vaccination.verifiedBy = req.user.hospitalName;

        await child.save();
        res.json({ message: 'Vaccination verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



router.post('/verify-otp/:vaccinationId', authenticate, verifyHospital, async (req, res) => {
    try {
        const { vaccinationId } = req.params;
        const { otp } = req.body;

        // Find the child and vaccination
        const child = await Child.findOne({ 'vaccinations._id': vaccinationId });
        if (!child) {
            return res.status(404).json({ message: 'Child or vaccination not found' });
        }

        const vaccination = child.vaccinations.id(vaccinationId);

        // Check if OTP is valid
        const now = new Date();
        if (
            !vaccination.vaccineOTP ||
            now > new Date(vaccination.otpExpires) ||
            vaccination.vaccineOTP !== otp
        ) {
            return res.status(400).json({ message: 'OTP is invalid or has expired' });
        }

        // Mark as verified
        vaccination.verified = true;
        vaccination.verifiedBy = req.user.hospitalName;
        vaccination.vaccineOTP = null;
        vaccination.otpExpires = null;

        await child.save();
        res.json({ message: 'Vaccination verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
module.exports = router;
