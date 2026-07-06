const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LogOut = sequelize.define('LogOut', {
  name: { type: DataTypes.STRING },
});

module.exports = LogOut;
