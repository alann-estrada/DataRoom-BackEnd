const express = require('express');
const routes = express.Router();
const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {
    createCalificationByStudent,
    updateCalificationByStudent,
    deleteCalification,
    getCalificationByStudent
} = require('../controllers/calification.controller.js')

routes.post('/createcalification', createCalificationByStudent)
routes.put('/updateCalification', updateCalificationByStudent)
routes.delete('/deleteCalification', deleteCalification)
routes.get('/getCalification', getCalificationByStudent)

module.exports = routes;