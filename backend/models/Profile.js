const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  designation: { type: DataTypes.STRING },
  date_of_joining: { type: DataTypes.DATE },
  address: { type: DataTypes.TEXT },
  bio: { type: DataTypes.TEXT },
  timezone: { type: DataTypes.STRING },
  language: { type: DataTypes.STRING },
});

module.exports = Profile;
