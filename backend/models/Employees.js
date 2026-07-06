const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employees = sequelize.define('Employees', {
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  date_of_birth: { type: DataTypes.DATE },
  gender: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  department: { type: DataTypes.STRING },
  designation: { type: DataTypes.STRING },
  date_of_joining: { type: DataTypes.DATE },
  base_salary: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
});

module.exports = Employees;
