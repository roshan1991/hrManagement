const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ViewAllProjects = sequelize.define('ViewAllProjects', {
  branch_id: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  start_date: { type: DataTypes.DATE },
  deadline: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING },
  cost: { type: DataTypes.STRING },
  priority: { type: DataTypes.STRING },
  estimated_hours: { type: DataTypes.STRING },
  department_ids: { type: DataTypes.STRING },
  client_id: { type: DataTypes.STRING },
  cover_pic: { type: DataTypes.STRING },
  project_leader: { type: DataTypes.STRING },
  assigned_member: { type: DataTypes.STRING },
  attachments: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  email: { type: DataTypes.STRING },
  contact_no: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
});

module.exports = ViewAllProjects;
