const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CycloneNepal = sequelize.define('CycloneNepal', {
  name: { type: DataTypes.STRING },
});

module.exports = CycloneNepal;
