// Import the express library
const express = require('express');
// Import routes from the routes file
const routes = require('./routes/index');

// Create an Express application
const app = express();

// Define the port using an environment variable or default to 5000
const port = process.env.PORT || 5000;


// Use express.json() middleware to automatically parse incoming JSON data
// express.json() needs to be registered globally before any route handling
// so that the req.body gets correctly populated with parsed JSON data
app.use(express.json()); // This is necessary for parsing JSON in requests

// Use routes from the routes/index.js file
app.use('/', routes);

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
