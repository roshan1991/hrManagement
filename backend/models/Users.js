const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

module.exports = Users;
