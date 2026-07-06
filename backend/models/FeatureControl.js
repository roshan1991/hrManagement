const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FeatureControl = sequelize.define('FeatureControl', {
  features: { type: DataTypes.TEXT },
});

module.exports = FeatureControl;
