const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Roles__Permissions = sequelize.define('Roles__Permissions', {
  name: { type: DataTypes.STRING },
  backend_login_authorize: { type: DataTypes.STRING },
  is_active: { type: DataTypes.STRING },
});

module.exports = Roles__Permissions;
