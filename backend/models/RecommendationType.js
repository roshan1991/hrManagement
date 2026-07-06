const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RecommendationType = sequelize.define('RecommendationType', {
  title: { type: DataTypes.STRING },
  rating: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
});

module.exports = RecommendationType;
