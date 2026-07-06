const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LeaveBalance = sequelize.define('LeaveBalance', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  requested_by: { type: DataTypes.STRING },
  leave_type: { type: DataTypes.STRING },
  year: { type: DataTypes.STRING },
});

module.exports = LeaveBalance;
