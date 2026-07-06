const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Termination = sequelize.define('Termination', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  termination_type_id: { type: DataTypes.STRING },
  notice_date: { type: DataTypes.DATE },
  termination_date: { type: DataTypes.DATE },
  reason: { type: DataTypes.TEXT },
  document: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Termination;
