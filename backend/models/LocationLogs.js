const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LocationLogs = sequelize.define('LocationLogs', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
});

module.exports = LocationLogs;
