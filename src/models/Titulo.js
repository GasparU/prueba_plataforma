const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Titulo = sequelize.define('titulo', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // userId
});

module.exports = Titulo;