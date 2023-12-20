const express = require('express');
const cors = require('cors');
const path = require('path');

class Server{
    constructor(){
        this.app = express();
        this.middlewares();
        this.port = process.env.PORT;
        this.routes();
        this.server = require("http").createServer(this.app);
    }
    
    routes(){
        this.app.use('/calification', require('../routes/calification.routes'));
        this.app.use('/group', require('../routes/groups.routes'));
        this.app.use('/plan', require('../routes/plan.routes'));
        this.app.use('/school',require('../routes/school.routes'));
        this.app.use('/student', require('../routes/students.routes'));
        this.app.use('/subject', require('../routes/subjects.routes'));
        this.app.use('/subpoenas', require('../routes/subpoenas.routes'));
        this.app.use('/teacher', require('../routes/teachers.routes'));
        this.app.use('/tutors', require('../routes/tutors.routes'));
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }

}

module.exports = Server;