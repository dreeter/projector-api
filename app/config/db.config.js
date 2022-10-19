module.exports = {
    //FOR MySQL
    HOST: "localhost",
    USER: "root",
    PASSWORD: "80e36p7xS!",
    DB: "projector",
    PORT: "3306",
    dialect: "mysql",
    //FOR SEQUELIZE
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };