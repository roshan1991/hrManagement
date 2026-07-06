const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notice = sequelize.define('Notice', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
  published_date: { type: DataTypes.DATE },
  target_department: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Notice;
