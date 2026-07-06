const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrainingType = sequelize.define('TrainingType', {
  branch_id: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
});

module.exports = TrainingType;
