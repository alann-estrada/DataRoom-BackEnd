const express = require('express');
const routes = express.Router();

const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent
} = require('../controllers/students.controller.js')

module.exports = routes;