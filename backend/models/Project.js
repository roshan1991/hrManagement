const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  client: { type: DataTypes.STRING },
  assigned_to: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  deadline: { type: DataTypes.DATE },
  priority: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Project;
