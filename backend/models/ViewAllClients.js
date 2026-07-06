const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ViewAllClients = sequelize.define('ViewAllClients', {
  branch_id: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  contact_no: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
});

module.exports = ViewAllClients;
