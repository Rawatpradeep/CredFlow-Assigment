const dotenv = require("dotenv");

module.exports = () => {
  dotenv.config();
  process.config = {
    db: {
      connection: process.env.DB_CONNECTION,
      name: process.env.DB_DATABASE_NAME,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: process.env.DB_DIALECT,
    },
    redis: {
      redisport: process.env.REDIS_PORT,
      redishost: process.env.REDIS_HOST,
      redispassword: process.env.REDIS_PASSWORD,
    },
    saltRounds: parseInt(process.env.SALT_ROUNDS),
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
    TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
    cookieKey: process.env.COOKIE_KEY,
    APP_URL: process.env.APP_URL,
    WEB_URL: process.env.WEB_URL,
    APP_PORT: process.env.APP_PORT,
  };
};
