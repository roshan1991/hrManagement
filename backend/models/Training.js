const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Training = sequelize.define('Training', {
  branch_id: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  training_type_id: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
  start_time: { type: DataTypes.STRING },
  end_time: { type: DataTypes.STRING },
  cost: { type: DataTypes.STRING },
  venue: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  certificate: { type: DataTypes.STRING },
});

module.exports = Training;
