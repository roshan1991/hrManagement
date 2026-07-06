const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Routers = sequelize.define('Routers', {
  name: { type: DataTypes.STRING },
  ip: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  model: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Routers;
