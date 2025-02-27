const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const healthcareProviderSchema = new mongoose.Schema({
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hospitalName: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
healthcareProviderSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('HealthcareProvider', healthcareProviderSchema);