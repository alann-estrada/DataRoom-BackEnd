const express = require('express');
const routes = express.Router();

const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {
    updatePlan
} = require('../controllers/plan.controller.js')

routes.put('/plan', updatePlan)

module.exports = routes;