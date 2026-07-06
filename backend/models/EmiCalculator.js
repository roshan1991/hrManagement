const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmiCalculator = sequelize.define('EmiCalculator', {
  interestType: { type: DataTypes.STRING },
});

module.exports = EmiCalculator;
