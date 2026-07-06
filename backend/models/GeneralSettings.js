const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GeneralSettings = sequelize.define('GeneralSettings', {
  company_name: { type: DataTypes.STRING },
  company_email: { type: DataTypes.STRING },
  company_phone: { type: DataTypes.STRING },
  company_address: { type: DataTypes.STRING },
  timezone: { type: DataTypes.STRING },
  date_format: { type: DataTypes.STRING },
  currency: { type: DataTypes.STRING },
  currency_symbol: { type: DataTypes.STRING },
  working_days: { type: DataTypes.STRING },
  working_hours_start: { type: DataTypes.STRING },
  working_hours_end: { type: DataTypes.STRING },
  late_mark_after: { type: DataTypes.STRING },
  probation_period: { type: DataTypes.STRING },
  fiscal_year_start: { type: DataTypes.DATE },
  language: { type: DataTypes.STRING },
});

module.exports = GeneralSettings;
