// backend/routes/healthCenterRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const { lat, lng } = req.query;

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lng}`,
                radius: 5000,
                type: 'hospital|healthcare',
                key: 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao'
            }
        });

        res.json(response.data.results.map(result => ({
            name: result.name,
            vicinity: result.vicinity,
            rating: result.rating,
            user_ratings_total: result.user_ratings_total,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            opening_hours: result.opening_hours
        })));

    } catch (error) {
        console.error('Health centers error:', error);
        res.status(500).json({ message: 'Error fetching health centers' });
    }
});

module.exports = router;