// Import MongoClient
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

/**
 * AuthController class contains methods to handle authentication-related API endpoints
 * Methods include handling user login (connect), logout (disconnect),
 * and user authentication status.
 */
class AuthController {
  static async getConnect(req, res) {
    // Get the Authorization header
    const authorizationHeader = req.headers.authorization;

    // Check if the Authorization header is valid and starts with 'Basic'
    if (authorizationHeader && authorizationHeader.startsWith('Basic ')) {
      // Extract the base64-encoded part of the Authorization header
      const base64Credentials = authorizationHeader.split(' ')[1]; // Remove "Basic " part
      // Decode the base64 string into plain text (email:password)
      const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      // Split the decoded string into email and password
      const [email, password] = decodedCredentials.split(':');

      // Log the extracted email and password
      // console.log('Email:', email);
      // console.log('Password:', password);

      // You can now proceed to verify the email and password, etc.
      // res.send('Credentials extracted successfully');
    } else {
      // If the Authorization header is not provided or invalid
      res.status(400).send('Missing or invalid Authorization header');
    }
    // console.log(authorizationHeader);
  }

  static async getDisconnect(req, res) {
    console.log(req.body);
    console.log(req.headers);
  }
}

module.exports = AuthController;
