const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoanRepayment = sequelize.define('LoanRepayment', {
  branch_id: { type: DataTypes.STRING },
  type_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
});

module.exports = LoanRepayment;
