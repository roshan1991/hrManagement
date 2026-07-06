const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LeaveRequest = sequelize.define('LeaveRequest', {
  employee: { type: DataTypes.STRING },
  leave_type: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
  reason: { type: DataTypes.TEXT },
  attachment: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = LeaveRequest;
