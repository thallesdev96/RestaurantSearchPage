const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming your Sequelize connection is named 'sequelize'

const DietaryPreference = sequelize.define('DietaryPreference', {
    // Define the attributes/columns of the dietary_preferences table
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Define foreign key restaurant_id
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'restaurants', // Assuming the table name is restaurants
            key: 'id'
        }
    }
});

module.exports = DietaryPreference;
