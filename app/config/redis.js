const redis = require("redis");

class Redis {
  static client = null;

  static getClient = async () => {
    client = redis.createClient({
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      //   password: process.env.REDIS_PASSWORD,
    });

    return Redis.client;
  };

  static setValue = (key, value) => Redis.client.set(key, value);

  static init = async () => {
    try {
      const redisclient = await Redis.getClient();
    } catch (err) {}
  };
}

export default Redis;
