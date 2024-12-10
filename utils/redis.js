// import redis
const redis = require('redis');
const { promisify } = require('util'); // Helps convert callbacks to promises

class RedisClient {
  constructor() {
    // create Redis client
    this.client = redis.createClient();

    this.client.on('connect', () => {
      // Do nothing
    });

    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  isAlive() {
    return this.client.connected; // Returns true if connected
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    await getAsync(key); // Returns the value of the key
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.setex).bind(this.client);
    await setAsync(key, duration, value); // set key with expiration
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key); // delete the key
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
