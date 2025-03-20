
// routes/child.js
const express = require('express');
const router = express.Router();
const Child = require('../models/Child');
const auth = require('../middleware/auth');

// Get vaccination card data
router.get('/:id/vaccination-card', auth, async (req, res) => {
    try {
        const child = await Child.findById(req.params.id)
            .populate('parent', 'name email')
            .lean();

        if (!child) {
            return res.status(404).json({ message: 'Child not found' });
        }

        // Filter only completed vaccinations
        const completedVaccines = child.vaccinations.filter(v => v.status === 'Completed');

        res.json({
            childName: child.name,
            dob: child.dateOfBirth,
            parentName: child.parent.name,
            vaccines: completedVaccines
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
