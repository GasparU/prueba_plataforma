const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Pregunta = sequelize.define('preguntas', {
    ask: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true        
    },
});

module.exports = Pregunta;