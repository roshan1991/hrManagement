const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tada = sequelize.define('Tada', {
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  employee: { type: DataTypes.STRING },
  amount: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  type: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Tada;
