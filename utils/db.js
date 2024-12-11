const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.uri = `mongodb://${host}:${port}`;
    this.databaseName = database;
    this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
    this.db = null;

    // Initialize connection
    this.init();
  }

  async init() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.databaseName);
    } catch (error) {
      console.error('MongoDB connection failed:', error);
    }
  }

  isAlive() {
    const isConnected = this.client.isConnected();
    return isConnected;
  }

  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (error) {
      console.error('Failed to count users:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error('Failed to count files:', error);
      return 0;
    }
  }

  async close() {
    try {
      await this.client.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Failed to close MongoDB connection:', error);
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
