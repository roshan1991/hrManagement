const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resignation = sequelize.define('Resignation', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  resignation_date: { type: DataTypes.DATE },
  last_working_day: { type: DataTypes.DATE },
  reason: { type: DataTypes.TEXT },
  document: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Resignation;
