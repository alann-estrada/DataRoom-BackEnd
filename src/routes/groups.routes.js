const express = require('express');
const routes = express.Router();
const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {} = require('../controllers/groups.controller.js')

module.exports = routes;