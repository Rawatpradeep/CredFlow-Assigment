import UserService from "../../app/service/user.service";

const jwt = require("jsonwebtoken");
const redis = require("redis");

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: "192.168.0.107",
  //   password: process.env.REDIS_PASSWORD,
});

const getUserIdByVerifyToken = (userVerifyToken) =>
  new Promise((resolve, reject) => {
    client.get(userVerifyToken, async (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });

export default async (req, res, next) => {
  try {
    let accessToken;
    const { cookies = {} } = req;
    console.log("cookies---------------- :>> ", cookies, { cookies });
    if (cookies.accessToken) {
      accessToken = cookies.accessToken;
    }
    let user;
    let userId;
    let jwtPasswordVersion;
    if (accessToken) {
      const secret = process.config.TOKEN_SECRET_KEY;
      const decodedAccessToken = await jwt.verify(accessToken, secret);

      const {
        userVerifyToken,
        password_version: passwordVersion,
      } = decodedAccessToken;
      jwtPasswordVersion = passwordVersion;

      const result = await getUserIdByVerifyToken(userVerifyToken);

      userId = result;

      user = await UserService.getUserByUserId(userId);
      const { password_version } = user;

      if (password_version !== jwtPasswordVersion) {
        return res
          .status(401)
          .json({
            status: false,
            statusCode: 401,
            message: "Invalid AccessToken",
          });
      }

      if (user) {
        req.userId = userId;
        req.userVerifyToken = userVerifyToken;
      }
      return next();
    }

    return res
      .status(401)
      .json({ status: false, statusCode: 401, message: "Invalid Token" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
