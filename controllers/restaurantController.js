const Restaurant = require('../models/restaurant');

exports.index = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.render('index', { data: restaurants }); // Pass restaurants instead of data
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(500).send('Internal Server Error');
    }
};

