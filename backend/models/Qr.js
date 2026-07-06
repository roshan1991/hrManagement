const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Qr = sequelize.define('Qr', {
  branch_id: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Qr;
