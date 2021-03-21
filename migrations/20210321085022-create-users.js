import { TABLE_NAME } from "../app/models/user";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      age: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        set(val) {
          this.setDataValue("email", val.toLowerCase());
        },
      },
      password: {
        type: Sequelize.STRING(1000),
        required: true,
      },
      password_version: {
        type: Sequelize.BIGINT,
      },
      phone: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable(TABLE_NAME),
};
