const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FiscalYear = sequelize.define('FiscalYear', {
  year: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
});

module.exports = FiscalYear;
