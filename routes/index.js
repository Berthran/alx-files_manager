// Import Express framework
const express = require('express');

// Import the AppController, which contains the logic for handling the routes
const AppController = require('../controllers/AppController');

// Import the UsersController, which contains the logic for handling the user routes
const UsersController = require('../controllers/UsersController');

// Create a new router object to define modular routes
const router = express.Router();

/**
 * Define a GET route for '/status'.
 * - When a GET request is made to '/status', the getStatus method in AppController is called.
 * - The getStatus method will handle sending the response.
 */
router.get('/status', AppController.getStatus);

/**
 * Define a GET route for '/stats'.
 * When a GET request is made to '/stats', the getStats method in AppController is called.
 * The getStats method will handle sending the response.
 */
router.get('/stats', AppController.getStats);

/**
 * Define a POST route for '/users'.
 * When a POST request is made to '/users', the postNew method in UsersControler is called.
 * The postNew methode will handle sending the response
 */
router.post('/users', UsersController.postNew);

/**
 * Export the router object so it can be used in other files.
 * - In this case, it will be imported and mounted in server.js.
 */
module.exports = router;
