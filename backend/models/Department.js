const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('Department', {
  branch_id: { type: DataTypes.STRING },
  dept_name: { type: DataTypes.STRING },
  dept_head_id: { type: DataTypes.STRING },
  is_active: { type: DataTypes.STRING },
});

module.exports = Department;
