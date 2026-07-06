const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TaxReport = sequelize.define('TaxReport', {
  year: { type: DataTypes.STRING },
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  include_ssf: { type: DataTypes.STRING },
});

module.exports = TaxReport;
