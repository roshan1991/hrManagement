const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Warning = sequelize.define('Warning', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  subject: { type: DataTypes.STRING },
  warning_date: { type: DataTypes.DATE },
  message: { type: DataTypes.TEXT },
});

module.exports = Warning;
