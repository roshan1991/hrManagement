const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AppSettings = sequelize.define('AppSettings', {
  settings: { type: DataTypes.TEXT },
});

module.exports = AppSettings;
