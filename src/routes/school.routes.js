const express = require('express');
const routes = express.Router();
const { isAuthenticated } = require("../middlewares/authentication.middleware.js");
const { 
    createShcool,
    getSchoolById,
    deleteSchool,
    updateSchool
} = require('../controllers/school.controller.js')

routes.post('/createschool', createShcool)
routes.get('/getschool', getSchoolById)
routes.delete('/deleteschool', deleteSchool)
routes.put('/updateschool', updateSchool)

module.exports = routes;