const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Support = sequelize.define('Support', {
  subject: { type: DataTypes.STRING, allowNull: false },
  employee_name: { type: DataTypes.STRING },
  query_message: { type: DataTypes.TEXT },
  reply_message: { type: DataTypes.TEXT },
  priority: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Support;
