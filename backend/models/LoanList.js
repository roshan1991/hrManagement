const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoanList = sequelize.define('LoanList', {
  employee: { type: DataTypes.STRING },
  loan_type: { type: DataTypes.STRING },
  amount: { type: DataTypes.STRING },
  interest_rate: { type: DataTypes.STRING },
  duration_months: { type: DataTypes.STRING },
  emi_amount: { type: DataTypes.STRING },
  reason: { type: DataTypes.TEXT },
  approval_status: { type: DataTypes.STRING },
  applied_date: { type: DataTypes.DATE },
});

module.exports = LoanList;
