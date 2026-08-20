const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  features: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  github_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  live_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Project;
