const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.renderIndexPage);

router.post('/search', async (req, res) => {
    try {
        console.log(req.body);
        const filters = {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            dietaryPreferences: req.body.dietaryPreferences,
            // Add other parameters as needed
        };

        const restaurants = await restaurantController.searchRestaurants(filters);
        res.render('searchResults', { restaurants });
    } catch (err) {
        console.error('Error searching restaurants:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
