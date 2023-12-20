const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");

async function createTeacher (req = request, res = response){
    const {id_school} = req.params;
    const {name, lastname, email, curp} = req.body;
    const idGenerate = generateID();
    try {
        const [school] = await promisePool.query("SELECT id FROM school WHERE id = ?", [id_school]);
        if(!school.length){
            return res.status(400).json({
                ok: false,
                status:400,
                msg: "La escuela no existe"
            })
        }
        await promisePool.query("INSERT INTO teachers SET ?", [{
            id: idGenerate,
            id_school: school[0].id,
            name: name.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            curp: curp.trim()
        }])
        const token = await jwt.sign(
            {
                id: idGenerate,
            },
            process.env.SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        return res.status(200).cookie("token", token)
        .json({
            ok: true,
            status: 200,
            msg: "Profesor insertado"
        })
    } catch (error) {
        return res.status(500).json({
            info: {
                ok: false,
                status: 500,
                msg: "Error inesperado intentalo mas tarde",
                error
            }
        })
    }

}

async function login (req = request, res = response){
    const {email, curp} = req.body;
    try {
        const [teacher] = await promisePool.query("SELECT * FROM teachers WHERE email = ? AND curp = ?", [email, curp]);
        if(!teacher.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El profesor no existe"
            })
        }
        const token = await jwt.sign(
            {
                id: user[0].id,
            },
            process.env.SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        return res.status(200).cookie("token", token)
        .json({
            ok: true,
            status: 200,
            msg: "Profesor logeado",
            data: {
                token,
                user: user[0]
            },
        });
    } catch (error) {
        return res.status(500).json({
            info: {
                ok: false,
                status: 500,
                msg: "Error inesperado intentalo mas tarde",
                error
            }
        })
    }
}

async function logout(req = request, res = response) {
    const token = req.headers["authorization"];
    jwt.sign(
        token,
        "",
        { expiresIn: 1, },
        (logout, err) => {
            if (logout) {
                res.clearCookie("token");
                res.status(200).send({ message: "Sesión cerrada" });
            } else {
                res.status(500).send({ error: err });
            }
        }
    );
}



module.exports = {
    createTeacher,
    login,
    logout
}