const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LogoutRequests = sequelize.define('LogoutRequests', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
});

module.exports = LogoutRequests;
