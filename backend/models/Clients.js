const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clients = sequelize.define('Clients', {
  client_name: { type: DataTypes.STRING },
  company: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING },
});

module.exports = Clients;
