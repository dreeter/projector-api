const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
        task_id: {
          type: DataTypes.INTEGER
        }
      });
    
      return Project;
};
