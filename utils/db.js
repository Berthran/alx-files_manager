const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Retrieve MongoDB connection details from environment variables or set defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.uri = `mongodb://${host}:${port}`;
    this.databaseName = database;
    
    // MongoDB client initialization
    this.client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        console.log('MongoDB connected successfully');
        this.db = this.client.db(this.databaseName);
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
      });
  }

  // Check if the connection to MongoDB is alive
  async isAlive() {
    try {
      const isConnected = await this.client.isConnected(); // isConnected() in MongoDB client
      return isConnected;
    } catch (error) {
      console.error('Error checking MongoDB connection:', error);
      return false;
    }
  }

  // Get the number of users in the 'users' collection
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      return 0;
    }
  }

  // Get the number of files in the 'files' collection
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
