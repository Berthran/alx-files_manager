// Import the express library
const express = require('express');
// Import routes from the routes file
const routes = require('./routes/index');

// Create an Express application
const app = express();

// Define the port using an environment variable or default to 5000
const port = process.env.PORT || 5000;

// Use routes from the routes/index.js file
app.use('/', routes);

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
