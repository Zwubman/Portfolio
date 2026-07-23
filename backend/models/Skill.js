const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: DataTypes.ENUM('Frontend', 'Backend', 'Databases', 'Tools'),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'skills',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Skill;
