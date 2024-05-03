const { Sequelize } = require('sequelize')

// 'Base de datoa', 'nombre de usuario', 'password'
const sequelize = new Sequelize('encuesta', 'postgres', 'root',{
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize