const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StaticPageContent = sequelize.define('StaticPageContent', {
  page_title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, unique: true },
  content: { type: DataTypes.TEXT },
  last_updated_by: { type: DataTypes.STRING },
});

module.exports = StaticPageContent;
