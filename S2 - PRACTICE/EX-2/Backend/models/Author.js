const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Author;