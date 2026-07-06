const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Complaint = sequelize.define('Complaint', {
  title: { type: DataTypes.STRING },
  employee: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  priority: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
});

module.exports = Complaint;
