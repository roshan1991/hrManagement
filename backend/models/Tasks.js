const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tasks = sequelize.define('Tasks', {
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  project: { type: DataTypes.STRING },
  client: { type: DataTypes.STRING },
  assigned_to: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  deadline: { type: DataTypes.DATE },
  priority: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Tasks;
