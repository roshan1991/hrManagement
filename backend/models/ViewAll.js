const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ViewAll = sequelize.define('ViewAll', {
  name: { type: DataTypes.STRING },
});

module.exports = ViewAll;
