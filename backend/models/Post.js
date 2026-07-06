const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  branch_id: { type: DataTypes.STRING },
  dept_id: { type: DataTypes.STRING },
  post_name: { type: DataTypes.STRING },
  is_active: { type: DataTypes.STRING },
});

module.exports = Post;
