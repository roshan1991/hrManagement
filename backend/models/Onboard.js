const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Onboard = sequelize.define('Onboard', {
  applicant: { type: DataTypes.STRING },
  position: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  offer_date: { type: DataTypes.DATE },
  join_date: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT },
});

module.exports = Onboard;
