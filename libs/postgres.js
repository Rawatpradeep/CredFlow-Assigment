import Sequelize from "sequelize";

// MODELS

import * as user from "../app/models/user";

const models = [user];

class Database {
  static connection = null;

  static getDatabase = async () => {
    //console.log("=====", Database.connection);
    if (Database.connection === null) {
      Database.connection = await new Sequelize(
        process.config.db.name,
        process.config.db.username,
        process.config.db.password,
        {
          logging: false,
          host: process.config.db.host,
          dialect: "postgres",
          dialectOptions: {
            options: {
              port: 5432,
            },
          },
        }
      );
    }

    return Database.connection;
  };

  static getModel = (tableName) => Database.connection.models[tableName];

  static initTransaction = () => Database.connection.transaction();

  static init = async () => {
    try {
      const database = await Database.getDatabase();
      await database.authenticate();
      for (const model of models) {
        model.db(database);
      }

      for (const model of models) {
        model.associate(database);
      }
      console.log("Db and tables have been created...");
    } catch (err) {
      console.log("err------------3333-------- :>> ", err);
    }
  };
}

export default Database;
