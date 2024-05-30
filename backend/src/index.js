const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const route = require('./routes');
const db = require('../config/db');
const cors = require('cors');
const socketIo = require('socket.io');
const session = require('express-session')
const port = 5000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS for requests from React website
// app.use(cors({ origin: 'http://localhost:3000' })); // React
// app.use(cors({ origin: 'http://localhost:5173' })); // Vite
app.use(cors({ origin: 'https://yolohome-smart-home-system.onrender.com' })); // Hosting on Render

// Database
db.connect();

// Morgan
app.use(morgan('combined'));

// Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session
app.use(session({
	secret: 'mySecretKey',
	resave: true,
	saveUninitialized: false
}));

// Routes
route(app); // Pass the express app instance to the route function

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});