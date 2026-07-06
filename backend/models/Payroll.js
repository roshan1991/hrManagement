const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payroll = sequelize.define('Payroll', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  year: { type: DataTypes.STRING },
  salary_cycle: { type: DataTypes.STRING },
  month: { type: DataTypes.STRING },
  week: { type: DataTypes.STRING },
  include_tds: { type: DataTypes.STRING },
  include_ssf: { type: DataTypes.STRING },
  include_pf: { type: DataTypes.STRING },
  include_tada: { type: DataTypes.STRING },
  include_advance_salary: { type: DataTypes.STRING },
  attendance: { type: DataTypes.STRING },
  payment_method_id: { type: DataTypes.STRING },
  paid_on: { type: DataTypes.DATE },
});

module.exports = Payroll;
