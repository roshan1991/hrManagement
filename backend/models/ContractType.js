const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContractType = sequelize.define('ContractType', {
  branch_id: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  is_permanent: { type: DataTypes.STRING },
  duration: { type: DataTypes.STRING },
  notice_days: { type: DataTypes.STRING },
});

module.exports = ContractType;
