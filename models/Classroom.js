const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Classroom = sequelize.define('Classroom', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isLab: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default value is false (not a lab)
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Assuming a newly added classroom is available
  },
});


module.exports = Classroom;
