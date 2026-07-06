const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trainer = sequelize.define('Trainer', {
  branch_id: { type: DataTypes.STRING },
  trainer_type: { type: DataTypes.STRING },
  department_id: { type: DataTypes.STRING },
  employee_id: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  contact_number: { type: DataTypes.STRING },
  expertise: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
});

module.exports = Trainer;
