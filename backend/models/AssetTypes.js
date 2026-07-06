const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssetTypes = sequelize.define('AssetTypes', {
  branch_id: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
});

module.exports = AssetTypes;
