// Import the MongoClient class from the MongoDB library
const { MongoClient } = require('mongodb');

/**
 * DBClient Class
 * A utility class for managing connections to a MongoDB database and performing basic operations
 */
class DBClient {
  constructor() {
    // Retrieve database connection details from environment variables or use default values
    const host = process.env.DB_HOST || 'localhost'; // Host address for MongoDB
    const port = process.env.DB_PORT || 27017; // Port for MongoDB
    const database = process.env.DB_DATABASE || 'files_manager'; // Database name

    // Construct the MongoDB URI
    this.uri = `mongodb://${host}:${port}`;
    this.databaseName = database;

    // Create a new MongoClient instance with unified topology for better connection management
    this.client = new MongoClient(this.uri, { useUnifiedTopology: true });

    // Placeholder for the database instance
    this.db = null;

    // Initialize the database connection
    this.init();
  }

  /**
   * Intialises the MongoDB connection and sets the database instance
   * Uses async/await to handle the asynchronous nature of MongoDB operations.
   */
  async init() {
    try {
      // Connect to MongoDB
      await this.client.connect();
      // Assign the connected database to the `db` property
      this.db = this.client.db(this.databaseName);
    } catch (error) {
      // Log an error message if the connection fails
      console.error('MongoDB connection failed:', error);
    }
  }

  /**
   * Checks if the MongoDB client is connected.
   * @returns {boolean} True if the client is connected, otherwise false.
   */
  isAlive() {
    const isConnected = this.client.isConnected(); // Checks connection status
    return isConnected;
  }

  /**
   * Counts the number of documents in the 'users' collection.
   * @returns {Promise<number>} The number of user documents, or 0 if an error occurs.
   */
  async nbUsers() {
    try {
      // Access the `user` collection
      const usersCollection = this.db.collection('users');
      // Count documents in the `users` collection
      return await usersCollection.countDocuments();
    } catch (error) {
      console.error('Failed to count users:', error);
      return 0;
    }
  }

  /**
   * Counts the number of documents in the 'files' collection.
   * @returns {Promise<number>} The number of file documents, or 0 if an error occurs.
   */
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error('Failed to count files:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
