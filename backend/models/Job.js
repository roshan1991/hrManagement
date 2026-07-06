const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  categories: { type: DataTypes.STRING },
  job_type_id: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  skills: { type: DataTypes.STRING },
  total_opening: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  deadline: { type: DataTypes.DATE },
  pay_by: { type: DataTypes.STRING },
  min_salary: { type: DataTypes.STRING },
  max_salary: { type: DataTypes.STRING },
  salary: { type: DataTypes.STRING },
  salary_rate: { type: DataTypes.STRING },
  disclose_salary_on_site: { type: DataTypes.STRING },
  job_description: { type: DataTypes.TEXT },
  requirements: { type: DataTypes.TEXT },
  benefits: { type: DataTypes.TEXT },
  experience: { type: DataTypes.STRING },
  required_fields: { type: DataTypes.STRING },
});

module.exports = Job;
