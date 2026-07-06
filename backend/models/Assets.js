const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Assets = sequelize.define('Assets', {
  branch_id: { type: DataTypes.STRING },
  type_id: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  asset_code: { type: DataTypes.STRING },
  asset_serial_no: { type: DataTypes.STRING },
  purchased_date: { type: DataTypes.DATE },
  warranty_available: { type: DataTypes.STRING },
  warranty_end_date: { type: DataTypes.DATE },
  is_available: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  note: { type: DataTypes.TEXT },
});

module.exports = Assets;
