// Import Express framework
const express = require('express');

// Import the AppController, which contains the logic for handling the routes
const AppController = require('../controllers/AppController');

// Import the UsersController, which contains the logic for handling the user-related routes
const UsersController = require('../controllers/UsersController');

// Importing the AuthController module, which handles authentication-related routes and logic
const AuthController = require('../controllers/AuthController');

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
 * Define a GET route for '/connect'.
 * When a GET request is made to '/connect', the getConnect method in AuthController is called.
 * The getConnect method will handle the authentication logic, such as user login.
 */
router.get('/connect', AuthController.getConnect);

/**
 * Define a GET route for '/disconnect'.
 * When a GET request is made to '/disconnect', the getDisconnect method in AuthController is called
 * The getDisconnect method will handle the user logout or disconnection process.
 */
router.get('/disconnect', AuthController.getDisconnect);

/**
 * Define a GET route for '/users/me'.
 * When a GET request is made to '/users/me', the getMe method in UserController is called.
 * The getMe method will handle fetching and returning the data of the currentlyauthenticated user.
 */
router.get('/users/me', UsersController.getMe);

/**
 * Export the router object so it can be used in other files.
 * - In this case, it will be imported and mounted in server.js.
 */
module.exports = router;
