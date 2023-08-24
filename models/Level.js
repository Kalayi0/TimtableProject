const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Level = db.define('Level', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Level;
