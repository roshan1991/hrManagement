const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoanType = sequelize.define('LoanType', {
  branch_id: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  minimum_amount: { type: DataTypes.STRING },
  maximum_amount: { type: DataTypes.STRING },
  interest_rate: { type: DataTypes.STRING },
  interest_type: { type: DataTypes.STRING },
  term: { type: DataTypes.STRING },
});

module.exports = LoanType;
