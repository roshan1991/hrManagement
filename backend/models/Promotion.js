const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Promotion = sequelize.define('Promotion', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  old_post_id: { type: DataTypes.STRING },
  post_id: { type: DataTypes.STRING },
  promotion_date: { type: DataTypes.DATE },
  description: { type: DataTypes.TEXT },
});

module.exports = Promotion;
