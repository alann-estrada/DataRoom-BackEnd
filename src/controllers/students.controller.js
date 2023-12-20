const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");

async function createStudent(req = request, res = response){
    const {id_school, id_group} = req.params;
    const {name, lastname, email} = req.body;
    try {
        const [school] = await promisePool.query("SELECT id FROM school WHERE id = ?", [id_school]);
        if(!school.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "La escuela no existe"
            })
        }
        const [group] = await promisePool.query("SELECT id FROM groups WHERE id = ?", [id_group]);
        if(!group.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El grupo no existe"
            })
        }
        await promisePool.query("INSERT INTO students SET ?", [{
            id: generateID(),
            id_school: school[0].id,
            id_group: group[0].id,
            name: name.trim(),
            lastname: lastname.trim(),
            email: email.trim()
        }])
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

async function getStudents (req = request, res = response){
    const { id } = req.params;
    try {
        const [student] = await promisePool.query("SELECT * FROM students WHERE id = ?", [id]);
        if(!student.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El estudiante no existe"
            })
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            student
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

async function updateStudent(req = request, res = response){
    const {id} = req.params;
    const {name, lastname, email} = req.body;
    try {
        const [student] = await promisePool.query("SELECT id FROM students WHERE id = ?", [id]);
        if(!student.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El estudiante no existe"
            })
        }
        await promisePool.query("UPDATE students SET ? WHERE id = ?", [{
            name: name.trim(),
            lastname: lastname.trim(),
            email: email.trim()
        }, id])
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Estudiante actualizado"
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

async function deleteStudent(req = request,res = response){
    const {id} = req.params;
    try {
        const [student] = await promisePool.query("SELECT id FROM students WHERE id = ?", [id]);
        if(!student.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El estudiante no existe"
            })
        }
        await promisePool.query("DELETE FROM students WHERE id = ?", [id]);
        await promisePool.query("DELETE FROM califications WHERE id_student = ?", [id]);
        await promisePool.query("DELETE FROM subpoenas WHERE id_student = ?", [id]);
        await promisePool.query("DELETE FROM tutors WHERE id_student = ?", [id]);
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Estudiante eliminado"
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

module.exports = {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent
}