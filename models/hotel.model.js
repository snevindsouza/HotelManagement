const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../config/db.config');

const Hotel = sequelize.define('Hotel',{
    id:{
        type:  DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{
    timestamps:false,
});

module.exports = Hotel;