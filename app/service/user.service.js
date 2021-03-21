import { TABLE_NAME } from "../models/user";
import Database from "../../libs/postgres";

class UserService {
  getUserByEmail = async (email) => {
    try {
      console.log(
        "Database.getModel(TABLE_NAME)-------------- :>> ",
        TABLE_NAME,
        Database.getModel(TABLE_NAME)
      );
      const res = await Database.getModel(TABLE_NAME).findOne({
        where: { email },
        raw: true,
      });
      return res;
    } catch (err) {
      throw err;
    }
  };

  getUserByUserId = async (userId) => {
    try {
      const res = await Database.getModel(TABLE_NAME).findOne({
        where: { id: userId },
        raw: true,
      });
      return res;
    } catch (err) {
      throw err;
    }
  };

  getUserDetails = async (userId) => {
    try {
      const res = await Database.getModel(TABLE_NAME).findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
        raw: true,
      });
      return res;
    } catch (err) {
      throw err;
    }
  };

  updateUser = async (data, userId) => {
    try {
      const res = await Database.getModel(TABLE_NAME).update(data, {
        where: {
          id: userId,
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  };
}

export default new UserService();
