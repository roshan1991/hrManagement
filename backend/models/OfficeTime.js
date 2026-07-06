const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OfficeTime = sequelize.define('OfficeTime', {
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  start_time: { type: DataTypes.STRING },
  end_time: { type: DataTypes.STRING },
  break_duration: { type: DataTypes.STRING },
  days: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = OfficeTime;
