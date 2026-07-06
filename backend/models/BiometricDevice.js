const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BiometricDevice = sequelize.define('BiometricDevice', {
  branch_id: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  serial_number: { type: DataTypes.STRING },
});

module.exports = BiometricDevice;
