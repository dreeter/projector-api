module.exports = (sequelize, Sequelize) => {
    const WorkItem = sequelize.define("WorkItem", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'CREATED'
      },
      priority: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'LOW'
      },
      description: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },
      due: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      completed: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      owner_id: {
        type: Sequelize.INTEGER,
        defaultValue: null
      },
      creator_id: {
        type: Sequelize.INTEGER,
        defaultValue: null
      }
    }, {
      freezeTableName: true
    });
  
    return WorkItem;
  };