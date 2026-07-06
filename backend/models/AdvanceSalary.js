const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AdvanceSalary = sequelize.define('AdvanceSalary', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  month: { type: DataTypes.STRING },
});

module.exports = AdvanceSalary;
