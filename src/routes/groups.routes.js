const express = require('express');
const routes = express.Router();
const { isAuthenticated } = require("../middlewares/authentication.middleware.js");

const {
    createGroup,
    getGroupById,
    deleteGroup,
    updateGroup
} = require('../controllers/groups.controller.js')

routes.post('/creategroup', createGroup)
routes.get('/getgroup', getGroupById)
routes.delete('/deletegroup', deleteGroup)
routes.put('/updategroup', updateGroup)

module.exports = routes;