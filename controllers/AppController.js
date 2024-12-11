// Import the Redis client and MongoDB Client utility
const redis = require('../utils/redis');
const dbClient = require('../utils/db');

/**
 * AppController class contains methods to handle the API endpoint
 */
class AppController {
  /**
     * 1. Handle the GET /status endpoint.
     * @return the status of Redis and MongoDB connections
     * - Sends a JSON response in the format { "redis"; true/false, "db": true/false}
     */
  static getStatus(req, res) {
    const redisStatus = redis.isAlive();
    const dbStatus = dbClient.isAlive();
    if (redisStatus && dbStatus) {
      res.status(200).json({ redis: redisStatus, db: dbStatus });
    }
  }

  static async getStats(req, res) {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    res.status(200).json({ users: numUsers, files: numFiles });
  }
}

// Export the AppController class so it can be used in routes/index.js
module.exports = AppController;
