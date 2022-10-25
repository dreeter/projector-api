const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("Project", {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        task_id: {
          type: DataTypes.INTEGER
        }
      });
    
      return Project;
};