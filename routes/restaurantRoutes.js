// routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/restaurants', restaurantController.searchRestaurants);

// // Route handler for search
// router.get('/search', async (req, res) => {
//     try {
//         const { latitude, longitude, dietaryPreferences, cuisineType, minRating, maxPrice } = req.query;
//         // Construct the database query based on the provided criteria
//         // Execute the query and return the search results
//         res.send('Search results will be displayed here');
//     } catch (error) {
//         console.error('Error searching restaurants:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


module.exports = router;
