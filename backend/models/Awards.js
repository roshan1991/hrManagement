const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Awards = sequelize.define('Awards', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  award_type_id: { type: DataTypes.STRING },
  gift_item: { type: DataTypes.STRING },
  award_base: { type: DataTypes.STRING },
  awarded_date: { type: DataTypes.DATE },
  awarded_by: { type: DataTypes.STRING },
  award_description: { type: DataTypes.TEXT },
  gift_description: { type: DataTypes.TEXT },
  attachment: { type: DataTypes.STRING },
  reward_code: { type: DataTypes.STRING },
});

module.exports = Awards;
