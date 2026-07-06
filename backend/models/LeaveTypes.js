const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LeaveTypes = sequelize.define('LeaveTypes', {
  branch_id: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  leave_paid: { type: DataTypes.STRING },
  leave_allocated: { type: DataTypes.STRING },
});

module.exports = LeaveTypes;
