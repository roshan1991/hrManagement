const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Setting = sequelize.define('Setting', {
  settings: { type: DataTypes.TEXT },
});

module.exports = Setting;
