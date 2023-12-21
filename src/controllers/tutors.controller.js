const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");


async function createTutor (req = request, res = response){
    const {id_student} = req.params;
    const {name, email} = req.body;

    try {
        const [student] = await promisePool.query("SELECT id FROM students WHERE id = ?", [id_student]);
        if(!student.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El estudiante no existe"
            })
        }
        await promisePool.query("INSERT INTO tutors SET ?", [{
            id: generateID(),
            id_student: student[0].id,
            name: name.trim(),
            email: email.trim()
        }])
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Tutor creado"
        })
    } catch (error) {
        return res.status(500).json({
            info: {
                ok: false,
                status: 500,
                message: "Error inesperado intentalo mas tarde",
                error,
            }
        })
    }
}

async function getTutorById (req = request, res = response){
    const { id } = req.params;
    try {
        const [tutor] = await promisePool.query("SELECT * FROM tutors WHERE id = ?", [id]);
        if(!tutor.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El tutor no existe"
            })
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            tutor
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            msg: "Error inesperado intentalo mas tarde",
            error
        })
    }
}

async function updateTutor (req = request, res = response){
    const {id} = req.params;
    const {name, email} = req.body;
    try {
        const [tutor] = await promisePool.query("SELECT id FROM tutors WHERE id = ?", [id]);
        if(!tutor.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El tutor no existe"
            })
        }
        await promisePool.query("UPDATE tutors SET ? WHERE id = ?", [{
            name: name.trim(),
            email: email.trim()
        }, id])
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Tutor actualizado"
        })
    } catch (error) {
        return res.status(500).json({
            info:{
                ok: false,
                status: 500,
                msg: "Error inesperado intentalo mas tarde",
                error
            }
        })
    }
}

async function deleteTutor (req = request, res = response){
    const {id} = req.params;
    try {
        const [tutor] = await promisePool.query("SELECT id FROM tutors WHERE id = ?", [id]);
        if(!tutor.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El tutor no existe"
            })
        }
        await promisePool.query("DELETE FROM tutors WHERE id = ?", [id]);
        await promisePool.query("DELETE FROM subpoenas WHERE id_tutor = ?", [id]);
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Tutor eliminado"
        })
    } catch (error) {
        return res.status(500).json({
            info:{
                ok: false,
                status: 500,
                msg: "Error inesperado intentalo mas tarde",
                error
            }
        })
    }
}

module.exports = {
   createTutor,
   getTutorById,
   updateTutor,
   deleteTutor 
}