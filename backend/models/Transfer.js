const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transfer = sequelize.define('Transfer', {
  old_branch_id: { type: DataTypes.STRING },
  old_department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  old_post_id: { type: DataTypes.STRING },
  old_supervisor_id: { type: DataTypes.STRING },
  old_office_time_id: { type: DataTypes.STRING },
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  post_id: { type: DataTypes.STRING },
  supervisor_id: { type: DataTypes.STRING },
  office_time_id: { type: DataTypes.STRING },
  transfer_date: { type: DataTypes.DATE },
  description: { type: DataTypes.TEXT },
});

module.exports = Transfer;
