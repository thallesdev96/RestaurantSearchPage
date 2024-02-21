const Restaurant = require('../models/restaurant');
const menuItem = require('../models/menuItem');
const dietaryPreferences = require('../models/dietaryPreferences');


// Function to fetch all restaurants
async function getAllRestaurants() {
    try {
        const restaurants = await Restaurant.findAll();
        return restaurants;
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        throw new Error('Error fetching restaurants');
    }
}

async function searchRestaurants(filters) {
    try {
        // Assuming filters object contains latitude, longitude, dietaryPreferences, cuisineType, rating, and priceRange
        const { latitude, longitude, dietaryPreferences, cuisineType, rating, priceRange } = filters;

        // Construct query based on filters
        let query = {};

        // Add location-based filter if latitude and longitude are provided
        if (latitude && longitude) {
            // Assuming Restaurant model has fields latitude and longitude
            query = {
                ...query,
                latitude: { $eq: latitude },
                longitude: { $eq: longitude }
            };
        }

        // Add dietary preferences filter if provided
        if (dietaryPreferences && dietaryPreferences.length > 0) {
            // Assuming Restaurant model has field dietaryPreferences as an array
            query = {
                ...query,
                dietaryPreferences: { $in: dietaryPreferences }
            };
        }

        // Add cuisine type filter if provided
        if (cuisineType) {
            // Assuming Restaurant model has field cuisineType
            query = {
                ...query,
                cuisineType: { $eq: cuisineType }
            };
        }

        // Add rating filter if provided
        if (rating) {
            // Assuming Restaurant model has field rating
            query = {
                ...query,
                rating: { $gte: rating }
            };
        }

        // Add price range filter if provided
        if (priceRange) {
            // Assuming Restaurant model has field priceRange
            query = {
                ...query,
                priceRange: { $lte: priceRange }
            };
        }

        // Query the database with the constructed query
        const restaurants = await Restaurant.findAll({
            where: query,
            include: [
                // { model: menu_item }, // Assuming MenuItem is the model for menu_items table
                {
                    model: dietaryPreferences,
                    as: 'dietary_preferences',
                    through: { attributes: [] } // If you don't want to include attributes from the join table (menu_items_dietary_preferences)
                }
            ]
        });

        console.log('restaurants', restaurants);

        return restaurants;
    } catch (err) {
        console.error('Error searching restaurants:', err);
        throw new Error('Error searching restaurants');
    }
}


async function renderIndexPage(req, res) {
    try {
        const restaurants = await getAllRestaurants();
        res.render('index', { data: restaurants });
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    searchRestaurants,
    renderIndexPage
};
