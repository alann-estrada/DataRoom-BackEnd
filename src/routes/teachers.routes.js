const express = require('express');
const routes = express.Router();

const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {createTeacher,
    login,
    logout
} = require('../controllers/teachers.controller.js')

routes.post('/createteacher', createTeacher)
routes.post('/login', login)
routes.get('/logout', logout)

module.exports = routes;