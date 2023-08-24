const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Department = require('./Department');

// Define the Course model
const Course = sequelize.define('Course', {
  code: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  requiresLab: {
    type: Sequelize.BOOLEAN,
    defaultValue: false, 
  },
});

// Establishing a relationship between Course and Department
Course.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(Course, { foreignKey: 'departmentId' });


module.exports = Course;
