const { DataTypes, ENUM } = require('sequelize')
const sequelize = require('../utils/database')


const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM("superadmin", "admin", "user"),
        defaultValue: "admin", 
        allowNull: false,
    }
  
})

User.prototype.toJSON = function(){
    const values = Object.assign({}, this.get())
    delete values.password
    return values
}


module.exports = User