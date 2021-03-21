import UserService from "../../service/user.service";
// import Redis from "../config/redis";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const crypto = require("crypto");

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: "192.168.0.107",
  //   password: process.env.REDIS_PASSWORD,
});

class UserController {
  signIn = async (req, res) => {
    console.log("sfasfasfasfasfasfsafasfasf", req.body);
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "No user Exist with the email " });
      }
      const { id, password_version } = user || {};
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const expiresIn = process.config.TOKEN_EXPIRE_TIME; // expires in 3 days

        const secret = process.config.TOKEN_SECRET_KEY;
        const userVerifyToken = `${user.id}.${crypto
          .randomBytes(40)
          .toString("hex")}`;
        const accessToken = await jwt.sign(
          {
            userId: id,
            userVerifyToken,
            password_version,
          },
          secret,
          {
            expiresIn,
          }
        );

        await client.set(userVerifyToken, user.id);
        res.cookie("accessToken", accessToken, {
          expires: new Date(Date.now() + 8 * 86400000),
          httpOnly: true,
        });

        return res
          .status(200)
          .json({ status: true, message: "User Sign-in successful" });
        // console.log("38129372193 a", a);
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Password Incorrect " });
      }
    } catch (error) {
      console.log("error--------------------------------- :>> ", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  signOut = async (req, res) => {
    try {
      const { userVerifyToken } = req;
      await client.del(userVerifyToken);

      res.clearCookie("accessToken");

      return res
        .status(200)
        .json({ status: true, message: "User Sign-in successful" });
    } catch (error) {
      console.log("error--------------------------------- :>> ", error);
    }
  };

  updateUserPassword = async (req, res) => {
    try {
      const { userId, userVerifyToken: prevUserVerifyToken } = req;
      const { prevPassword, newPassword, confirmPassword } = req.body;
      const user = await UserService.getUserByUserId(userId);
      const { password, password_version } = user || {};
      const passwordMatch = await bcrypt.compare(prevPassword, password);
      console.log(
        "prevPassword, newPassword, confirmPassword-------------- :>> ",
        prevPassword,
        newPassword,
        confirmPassword,
        newPassword === confirmPassword
      );
      if (newPassword !== confirmPassword) {
        return res.status(200).json({
          status: false,
          message: "New Password and Confirm Password Not Equal",
        });
      }

      const salt = process.config.saltRounds;
      if (passwordMatch) {
        const passwordHash = await bcrypt.hash(newPassword, salt);
        await UserService.updateUser(
          { password: passwordHash, password_version: password_version + 1 },
          userId
        );
      }

      const expiresIn = process.config.TOKEN_EXPIRE_TIME; // expires in 3 days

      const secret = process.config.TOKEN_SECRET_KEY;
      const userVerifyToken = `${userId}.${crypto
        .randomBytes(40)
        .toString("hex")}`;
      const accessToken = await jwt.sign(
        {
          userId: userId,
          userVerifyToken,
          password_version: password_version + 1,
        },
        secret,
        {
          expiresIn,
        }
      );

      res.cookie("accessToken", accessToken, {
        expires: new Date(Date.now() + 2 * 86400000),
        httpOnly: true,
      });

      await client.set(userVerifyToken, user.id);
      await client.del(prevUserVerifyToken);

      return res
        .status(200)
        .json({ status: true, message: "User Password Updated Successfully" });
    } catch (error) {
      console.log("error---------------- :>> ", error);
      return res.status(200).json({ status: false, message: "Server Error" });
    }
  };

  getUserDetail = async (req, res) => {
    try {
      const { userId } = req;
      console.log("cm he");
      const user = await UserService.getUserDetails(userId);

      return res.status(200).json({
        status: true,
        message: "User Data Fetched Successfully",
        data: user,
      });
    } catch (error) {
      return res.status(200).json({ status: false, message: "Server Error" });
    }
  };
}

export default new UserController();
