const express = require('express');
const router = express.Router(); // Add this line to define router
const { verifyToken } = require('../middleware/auth');
const Child = require('../models/Child');
const vaccineSchedule = require('../utils/vaccineSchedule');

// Apply authentication middleware to all child routes
router.use(verifyToken);

// Create a new child
router.post('/', async (req, res) => {
    try {
        const { dateOfBirth, ...childData } = req.body;
        const dob = new Date(dateOfBirth);

        // Generate vaccination schedule
        const vaccinations = vaccineSchedule.map(vaccine => {
            const scheduledDate = new Date(dob);

            if (vaccine.weeks) scheduledDate.setDate(scheduledDate.getDate() + (vaccine.weeks * 7));
            if (vaccine.months) scheduledDate.setMonth(scheduledDate.getMonth() + vaccine.months);
            if (vaccine.years) scheduledDate.setFullYear(scheduledDate.getFullYear() + vaccine.years);

            return {
                name: vaccine.name,
                scheduledDate,
                status: 'Pending'
            };
        });

        const newChild = new Child({
            ...childData,
            dateOfBirth: dob,
            vaccinations,
            parent: req.user.id,
            parentEmail: req.user.email
        });

        await newChild.save();
        res.status(201).json(newChild);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all children for the logged-in user
// GET /api/children
router.get('/', async (req, res) => {
    try {
        const children = await Child.find({ parent: req.user.id });
        res.json(children); // Ensure this is an array
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PATCH /api/children/:childId/vaccinations/:vaccineId
router.patch('/:childId/vaccinations/:vaccineId', async (req, res) => {
    try {
        const { childId, vaccineId } = req.params;
        const { status } = req.body;

        const child = await Child.findOne({
            _id: childId,
            parent: req.user.id // Ensure the child belongs to the logged-in user
        });

        if (!child) {
            return res.status(404).json({ message: 'Child not found' });
        }

        const vaccine = child.vaccinations.id(vaccineId);
        if (!vaccine) {
            return res.status(404).json({ message: 'Vaccine not found' });
        }

        vaccine.status = status;
        vaccine.actualDate = status === 'Completed' ? new Date() : null;

        await child.save();
        res.json(child);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/children/:childId
// PUT /api/children/:childId
router.put('/:childId', async (req, res) => {
    try {
        const { childId } = req.params;
        const updates = req.body;

        // Find the child
        const child = await Child.findOne({
            _id: childId,
            parent: req.user.id // Ensure the child belongs to the logged-in user
        });

        if (!child) {
            return res.status(404).json({ message: 'Child not found' });
        }

        // Update the date of birth and regenerate the vaccination schedule if needed
        if (updates.dateOfBirth) {
            const dob = new Date(updates.dateOfBirth);
            child.dateOfBirth = dob;

            // Generate new vaccination schedule
            const newVaccinations = vaccineSchedule.map(vaccine => {
                const scheduledDate = new Date(dob);

                if (vaccine.weeks) scheduledDate.setDate(scheduledDate.getDate() + (vaccine.weeks * 7));
                if (vaccine.months) scheduledDate.setMonth(scheduledDate.getMonth() + vaccine.months);
                if (vaccine.years) scheduledDate.setFullYear(scheduledDate.getFullYear() + vaccine.years);

                return {
                    name: vaccine.name,
                    scheduledDate,
                    status: 'Pending'
                };
            });

            child.vaccinations = newVaccinations;
            child.markModified('vaccinations'); // Ensure Mongoose detects changes
        }

        // Apply other updates
        Object.assign(child, updates);

        await child.save();
        res.json(child);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});




// DELETE /api/children/:childId
router.delete('/:childId', async (req, res) => {
    try {
        const { childId } = req.params;

        // Find and delete child
        const deletedChild = await Child.findOneAndDelete({
            _id: childId,
            parent: req.user.id // Ensure ownership
        });

        if (!deletedChild) {
            return res.status(404).json({ message: 'Child not found' });
        }

        res.json({ message: 'Child deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
module.exports = router;