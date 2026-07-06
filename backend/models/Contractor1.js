const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contractor1 = sequelize.define('Contractor1', {
  name: { type: DataTypes.STRING },
});

module.exports = Contractor1;
