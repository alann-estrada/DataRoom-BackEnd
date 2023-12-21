const express = require('express');
const routes = express.Router();

const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {
    createSubpoena,
    getSubpoenaByIdStudent,
    deleteOneSubpoena
} = require('../controllers/subpoenas.controller.js')

routes.post('/createsubpoena', createSubpoena)
routes.get('/getsub/:id', getSubpoenaByIdStudent)
routes.delete('/delete/:id', deleteOneSubpoena)

module.exports = routes;