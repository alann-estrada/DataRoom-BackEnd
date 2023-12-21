const express = require('express');
const routes = express.Router();
const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {
    createTutor,
    getTutorById,
    updateTutor,
    deleteTutor 
} = require('../controllers/tutors.controller.js')

routes.post('/createtutor', createTutor)
routes.get('/gettutor/:id', getTutorById)
routes.put('/update/:id', updateTutor)
routes.delete('/delete/:id', deleteTutor)

module.exports = routes;