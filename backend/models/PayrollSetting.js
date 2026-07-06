const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PayrollSetting = sequelize.define('PayrollSetting', {
  name: { type: DataTypes.STRING },
  component_type: { type: DataTypes.STRING },
  value_type: { type: DataTypes.STRING },
  annual_component_value: { type: DataTypes.STRING },
  apply_for_all: { type: DataTypes.STRING },
});

module.exports = PayrollSetting;
