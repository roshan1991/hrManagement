const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobType = sequelize.define('JobType', {
  branch_id: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
});

module.exports = JobType;
