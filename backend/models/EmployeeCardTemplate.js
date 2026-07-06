const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmployeeCardTemplate = sequelize.define('EmployeeCardTemplate', {
  settings: { type: DataTypes.TEXT },
  cardSettings: { type: DataTypes.TEXT },
});

module.exports = EmployeeCardTemplate;
