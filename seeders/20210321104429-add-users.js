import moment from "moment";
import { TABLE_NAME } from "../app/models/user";

const bcrypt = require("bcrypt");

const salt = process.config.saltRounds;

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(TABLE_NAME, [
      {
        name: "Pradeep",
        age: 25,
        email: "pradeep@mail.com",
        password: await bcrypt.hash("Password@123", 5),
        password_version: 1,
        phone: "1234567",
        created_at: moment().toISOString(),
        updated_at: moment().toISOString(),
      },
      {
        name: "Rahul",
        age: 25,
        email: "rahul@mail.com",
        password: await bcrypt.hash("Password@123", 5),
        password_version: 1,
        phone: "1234567",
        created_at: moment().toISOString(),
        updated_at: moment().toISOString(),
      },
      {
        name: "Rohit",
        age: 25,
        email: "rohit@mail.com",
        password: await bcrypt.hash("Password@123", 5),
        password_version: 1,
        phone: "12345367",
        created_at: moment().toISOString(),
        updated_at: moment().toISOString(),
      },
    ]);
  },

  down: (queryInterface) =>
    queryInterface.bulkDelete(DB_TABLES.PHARMACY_STATUS_TYPES, null, {}),
};
