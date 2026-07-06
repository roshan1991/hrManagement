const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AppQr = sequelize.define('AppQr', {
  title: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  code: { type: DataTypes.STRING },
  generated: { type: DataTypes.STRING },
  expires: { type: DataTypes.STRING },
  scans: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING },
});

module.exports = AppQr;
