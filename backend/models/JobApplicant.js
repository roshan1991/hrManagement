const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobApplicant = sequelize.define('JobApplicant', {
  job_id: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  expertise: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  notice_period: { type: DataTypes.STRING },
  application_source: { type: DataTypes.STRING },
  resume: { type: DataTypes.STRING },
  cover_letter: { type: DataTypes.TEXT },
  photo: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  current_ctc: { type: DataTypes.STRING },
  dob: { type: DataTypes.DATE },
  expected_ctc: { type: DataTypes.STRING },
  terms_conditions: { type: DataTypes.STRING },
});

module.exports = JobApplicant;
