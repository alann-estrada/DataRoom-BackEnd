const express = require('express');
const routes = express.Router();
const { isAuthenticated } = require("../middlewares/authentication.middleware.js");
const {
    updatePlan,
    createPlan,
    getPlans
} = require('../controllers/plan.controller.js')

routes.put('/plan', updatePlan)
routes.post('/createplan', createPlan)
routes.get('/getplans', getPlans)

module.exports = routes;