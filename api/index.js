const express = require('express');
const router = express.Router({});
const bodyParser = require('body-parser');
const cors = require('cors');
const redirectSSL = require('redirect-ssl');

// Server
const app = express();
app.use(cors());
app.use(redirectSSL);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);
require('./src/routes')(router);

// Database
const database = require('./src/database');
database.connect();

module.exports = {
  path: '/api/',
  handler: app
}
