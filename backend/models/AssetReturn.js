const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssetReturn = sequelize.define('AssetReturn', {
  asset_name: { type: DataTypes.STRING },
  asset_code: { type: DataTypes.STRING },
  employee: { type: DataTypes.STRING },
  assigned_date: { type: DataTypes.DATE },
  return_date: { type: DataTypes.DATE },
  condition: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING },
});

module.exports = AssetReturn;
