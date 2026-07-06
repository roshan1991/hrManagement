const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notifications = sequelize.define('Notifications', {
  notifications: { type: DataTypes.TEXT },
  settings: { type: DataTypes.TEXT },
});

module.exports = Notifications;
