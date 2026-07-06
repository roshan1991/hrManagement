const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmployeeContract = sequelize.define('EmployeeContract', {
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  employee: { type: DataTypes.STRING },
  contract_type: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING },
});

module.exports = EmployeeContract;
