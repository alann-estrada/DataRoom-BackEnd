const express = require('express');
const routes = express.Router();

const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {
    createSubject,
    deleteSubject,
    updateSubject,
    getSubject
} = require('../controllers/subjects.controller.js')

module.exports = routes;