const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmployeeSalary = sequelize.define('EmployeeSalary', {
  employee: { type: DataTypes.STRING },
  month_year: { type: DataTypes.STRING },
  basic_salary: { type: DataTypes.STRING },
  allowances: { type: DataTypes.STRING },
  deductions: { type: DataTypes.STRING },
  net_salary: { type: DataTypes.STRING },
  payment_method: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = EmployeeSalary;
