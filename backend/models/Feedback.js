const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feedback = sequelize.define('Feedback', {
  applicant: { type: DataTypes.STRING },
  position: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  interviewer: { type: DataTypes.STRING },
  interview_date: { type: DataTypes.DATE },
  feedback: { type: DataTypes.TEXT },
  result: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Feedback;
