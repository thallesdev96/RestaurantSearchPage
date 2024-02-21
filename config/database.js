const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;
