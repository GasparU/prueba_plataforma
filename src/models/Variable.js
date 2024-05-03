const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Variable = sequelize.define('variable', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = Variable;