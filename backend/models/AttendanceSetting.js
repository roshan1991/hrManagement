const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AttendanceSetting = sequelize.define('AttendanceSetting', {
  attendance_limit: { type: DataTypes.STRING },
  attendance_method: { type: DataTypes.STRING },
});

module.exports = AttendanceSetting;
