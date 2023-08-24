const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course'); 
const Room = require('./Room'); 

const Schedule = sequelize.define('Schedule', {
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Establishing a relationship between Schedule and Course
Schedule.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(Schedule, { foreignKey: 'courseId' });

// Establishing a relationship between Schedule and Room
Schedule.belongsTo(Room, { foreignKey: 'roomId' });
Room.hasMany(Schedule, { foreignKey: 'roomId' });

module.exports = Schedule;
