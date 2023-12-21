const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");


async function createSubpoena (req = request, res = response){
    const {id_teacher, id_tutor, id_group, id_subjects, id_school} = req.params;
    const {text} = req.body;

    try {
       const [teacher] = await promisePool.query("SELECT id FROM teachers WHERE id = ?", [id_teacher]);
         if(!teacher.length){
              return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El profesor no existe"
              })
         }
         const [tutor] = await promisePool.query("SELECT id FROM tutors WHERE id = ?", [id_tutor]);
            if(!tutor.length){
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: "El tutor no existe"
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
            const [subject] = await promisePool.query("SELECT id FROM subjects WHERE id = ?", [id_subjects]);
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
                    status: 400,
                    msg: "La escuela no existe"
                })
            }
            await promisePool.query("INSERT INTO subpoenas SET ?", [{
                id: generateID(),
                id_teacher: teacher[0].id,
                id_tutor: tutor[0].id,
                id_group: group[0].id,
                id_subjects: subject[0].id,
                id_school: school[0].id,
                text: text.trim()
            }])
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

async function getSubpoenaByIdStudent (req = request, res = response){
    const { id } = req.params;
    try {
        const [subpoena] = await promisePool.query("SELECT * FROM subpoenas WHERE id_student = ?", [id]);
        if(!subpoena.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "La citacion no existe"
            })
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            subpoena: subpoena[0]
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

async function deleteOneSubpoena (req = request, res = response){
    const { id } = req.params;
    try {
        const [subpoena] = await promisePool.query("SELECT id FROM subpoenas WHERE id = ?", [id]);
        if(!subpoena.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "La citacion no existe"
            })
        }
        await promisePool.query("DELETE FROM subpoenas WHERE id = ?", [id]);
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Citacion eliminada"
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
    createSubpoena,
    getSubpoenaByIdStudent,
    deleteOneSubpoena
}