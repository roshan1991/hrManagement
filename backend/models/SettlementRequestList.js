const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SettlementRequestList = sequelize.define('SettlementRequestList', {
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  employee: { type: DataTypes.STRING },
  amount: { type: DataTypes.STRING },
  request_date: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING },
});

module.exports = SettlementRequestList;
