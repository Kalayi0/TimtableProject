const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Course = require('./Course'); 

const ConfirmedCourses = sequelize.define('ConfirmedCourses', {
  semester: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Establishing a relationship between ConfirmedCourses and User (student)
ConfirmedCourses.belongsTo(User, { foreignKey: 'studentId' });
User.hasMany(ConfirmedCourses, { foreignKey: 'studentId' });

// Establishing a relationship between ConfirmedCourses and Course
ConfirmedCourses.belongsTo(Course, { foreignKey: 'courseId' });
Course.hasMany(ConfirmedCourses, { foreignKey: 'courseId' });

module.exports = ConfirmedCourses;
