const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming your Sequelize connection is named 'sequelize'
const Restaurant = require('./restaurant'); // Import the Restaurant model

const menuItem = sequelize.define('MenuItem', {
    // Define the attributes/columns of the menu_items table
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    // Define foreign key restaurant_id
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Define association
menuItem.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

module.exports = menuItem;
