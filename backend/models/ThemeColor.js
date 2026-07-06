const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ThemeColor = sequelize.define('ThemeColor', {
  primary_color: { type: DataTypes.STRING },
  hover_color: { type: DataTypes.STRING },
  dark_primary_color: { type: DataTypes.STRING },
  dark_hover_color: { type: DataTypes.STRING },
});

module.exports = ThemeColor;
