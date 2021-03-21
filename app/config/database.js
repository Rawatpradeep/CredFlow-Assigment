const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    database: "credflow",
    host: "192.168.0.107",
    username: "credflow",
    password: "ABCDEabcde!123",
    port: "5432",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
