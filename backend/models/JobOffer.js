const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobOffer = sequelize.define('JobOffer', {
  job_id: { type: DataTypes.STRING },
  applicant_id: { type: DataTypes.STRING },
  expiry_date: { type: DataTypes.DATE },
  joining_date: { type: DataTypes.DATE },
  salary: { type: DataTypes.STRING },
  salary_rate: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  benefits: { type: DataTypes.TEXT },
  offer_letter: { type: DataTypes.STRING },
});

module.exports = JobOffer;
