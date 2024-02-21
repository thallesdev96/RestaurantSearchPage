// server.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const restaurantRoutes = require('./routes/restaurantRoutes');
const bodyParser = require('body-parser'); // Import body-parser

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Set up routes
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Mounting the restaurantRoutes
app.use('/', restaurantRoutes);
// app.get('/', restaurantController.index);


// Sync models with database
sequelize.sync()
    .then(() => {
        console.log('Database & tables synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
