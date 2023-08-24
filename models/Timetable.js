// Import necessary modules and database connection
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Timetable model
const Timetable = sequelize.define('Timetable', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  // Define the fields for your timetable entry, such as course, venue, time, etc.
  course: {
    type: DataTypes.STRING,
    allowNull: false
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

// Sync the model with the database
sequelize.sync();

// Export the Timetable model
module.exports = Timetable;
