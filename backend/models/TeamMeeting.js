const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TeamMeeting = sequelize.define('TeamMeeting', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  meeting_date: { type: DataTypes.DATE },
  meeting_time: { type: DataTypes.STRING },
  link_location: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = TeamMeeting;
