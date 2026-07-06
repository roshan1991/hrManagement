const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Interview = sequelize.define('Interview', {
  applicant: { type: DataTypes.STRING },
  job: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  time: { type: DataTypes.STRING },
  interviewer: { type: DataTypes.STRING },
  mode: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  result: { type: DataTypes.STRING },
});

module.exports = Interview;
