const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Department = require('./Department'); // Assuming you have a Department model

const SpecialCourse = sequelize.define('SpecialCourse', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  requiresLab: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// Establishing a relationship between SpecialCourse and Department
SpecialCourse.belongsTo(Department, { foreignKey: 'departmentId' });
Department.hasMany(SpecialCourse, { foreignKey: 'departmentId' });

module.exports = SpecialCourse;
