const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  event_date: { type: DataTypes.DATE },
  event_time: { type: DataTypes.STRING },
  venue: { type: DataTypes.STRING },
  organizer: { type: DataTypes.STRING },
});

module.exports = Event;
