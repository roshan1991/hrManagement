const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
  attendance_date: { type: DataTypes.DATE },
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  check_in_at: { type: DataTypes.STRING },
  check_out_at: { type: DataTypes.STRING },
  edit_remark: { type: DataTypes.TEXT },
  night_checkin: { type: DataTypes.STRING },
  night_checkout: { type: DataTypes.STRING },
});

module.exports = Attendance;
