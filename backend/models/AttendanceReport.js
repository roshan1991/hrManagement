const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AttendanceReport = sequelize.define('AttendanceReport', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  date_option: { type: DataTypes.STRING },
  year: { type: DataTypes.STRING },
  attendance_date: { type: DataTypes.STRING },
});

module.exports = AttendanceReport;
