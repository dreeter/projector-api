//create sequelize data model

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("Project", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        item_id: {
          type: Sequelize.STRING
        }
      });
    
      return Project;
};