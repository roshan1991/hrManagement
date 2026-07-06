const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MargaretRobbins = sequelize.define('MargaretRobbins', {
  name: { type: DataTypes.STRING },
});

module.exports = MargaretRobbins;
