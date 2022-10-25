const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("Task", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      due: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      completed: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      parent_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      owner_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      creator_id: {
        type: DataTypes.INTEGER,
        defaultValue: null
      }
    });
  
    return Task;
  };