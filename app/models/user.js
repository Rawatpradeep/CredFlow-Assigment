import { DataTypes } from "sequelize";

export const TABLE_NAME = "users";

export const db = (database) => {
  database.define(
    TABLE_NAME,
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      age: {
        type: DataTypes.BIGINT(20),
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
        set(val) {
          this.setDataValue("email", val.toLowerCase());
        },
      },
      password: {
        type: DataTypes.STRING(1000),
      },
      password_version: {
        type: DataTypes.BIGINT,
      },
      phone: {
        type: DataTypes.BIGINT(20),
      },
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    }
  );
};

export const associate = (database) => {};
