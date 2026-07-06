const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AttendanceLogs = sequelize.define('AttendanceLogs', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
});

module.exports = AttendanceLogs;
