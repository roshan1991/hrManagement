const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LeaveApproval = sequelize.define('LeaveApproval', {
  employee: { type: DataTypes.STRING },
  leave_type: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
  reason: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING },
});

module.exports = LeaveApproval;
