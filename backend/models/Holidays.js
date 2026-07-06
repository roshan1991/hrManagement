const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Holidays = sequelize.define('Holidays', {
  event: { type: DataTypes.STRING },
  event_date: { type: DataTypes.DATE },
  is_public_holiday: { type: DataTypes.STRING },
  note: { type: DataTypes.TEXT },
});

module.exports = Holidays;
