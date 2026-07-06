const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentCurrency = sequelize.define('PaymentCurrency', {
  code: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  symbol: { type: DataTypes.STRING },
  exchange_rate: { type: DataTypes.STRING },
  is_default: { type: DataTypes.BOOLEAN },
  status: { type: DataTypes.STRING },
});

module.exports = PaymentCurrency;
