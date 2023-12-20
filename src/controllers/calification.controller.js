const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");
const { updateSchool } = require('./school.controller.js');

async function createCalificationByStudent (req = request, res = response){
    const {id_student, id_subject, id_school, id_group } = req.params;
    const {CF, CF1, CF2, CF3, CF4, CF5} = req.body;
    try {
        const [student] = await promisePool.query("SELECT id FROM students WHERE id = ?", [id_student]);
        if(!student.length){
            return res.status(400).json({
                ok: false,
                status:400,
                msg: "El alumno no existe"
            })
        }
        const [subject] = await promisePool.query("SELECT id FROM subjects WHERE id = ?", [id_subject]);
        if(!subject.length){
            return res.status(400).json({
                ok: false, 
                status: 400,
                msg: "La materia no existe"
            })
        }
        const [school] = await promisePool.query("SELECT id FROM school WHERE id = ?", [id_school]);
        if(!school.length){
            return res.status(400).json({
                ok: false,
                status:400,
                msg: "La escuela no existe"
            })
        }
        const [group] = await promisePool.query("SELECT id FROM groups WHERE id = ?", [id_group]);
        if (!group.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El grupo no existe"
            })
        }
        await promisePool.query("INSERT INTO califications SET ?", [{
            id: generateID(),
            id_student: id_student.trim(),
            id_subject: id_subject.trim(),
            id_school: id_school.trim(),
            id_group: id_group.trim(),
            CF: CF.trim(),
            CF1: CF1.trim(),
            CF2: CF2.trim(),
            CF3: CF3.trim(),
            CF4: CF4.trim(),
            CF5: CF5.trim()
        }])
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Calificacion insertada"
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

async function updateCalificationByStudent(req = request, res = response){
    const {id_student, id_subject, id_school, id_group } = req.params;
    const {CF, CF1, CF2, CF3, CF4, CF5} = req.body;
    try {
        const [student] = await promisePool.query("SELECT id FROM students WHERE id = ?", [id_student]);
        if(!student.length){
            return res.status(400).json({
                ok: false,
                status:400,
                msg: "El alumno no existe"
            })
        }
        const [subject] = await promisePool.query("SELECT id FROM subjects WHERE id = ?", [id_subject]);
        if(!subject.length){
            return res.status(400).json({
                ok: false, 
                status: 400,
                msg: "La materia no existe"
            })
        }
        const [school] = await promisePool.query("SELECT id FROM school WHERE id = ?", [id_school]);
        if(!school.length){
            return res.status(400).json({
                ok: false,
                status:400,
                msg: "La escuela no existe"
            })
        }
        const [group] = await promisePool.query("SELECT id FROM groups WHERE id = ?", [id_group]);
        if (!group.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El grupo no existe"
            })
        }
        const [calification] = await promisePool.query("SELECT id FROM califications WHERE id_student = ? AND id_subject = ? AND id_school = ? AND id_group = ?", [id_student, id_subject, id_school, id_group]);
        if(!calification.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "La calificacion no existe"
            })
        }
        await promisePool.query("UPDATE califications SET CF = ?, CF1 = ?, CF2 = ?, CF3 = ?, CF4 = ?, CF5 = ? WHERE id_student = ? AND id_subject = ? AND id_school = ? AND id_group = ?", [CF, CF1, CF2, CF3, CF4, CF5, id_student, id_subject, id_school, id_group]);
        return res.status(200).json({
              ok: true,
            status: 200,
            msg: "Calificacion actualizada"
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

async function deleteCalification( req = request, res = response){
    const {id_student, id_subject, id_school, id_group} = req.params;
    
}
module.exports = {

}