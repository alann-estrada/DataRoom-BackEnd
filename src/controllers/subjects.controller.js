const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");

async function createSubject (req = request, res = response){
    const {id_group, id_teacher } = req.params;
    const {name, assignation_link } = req.body;

    try {
        const [group] = await promisePool.query("SELECT id FROM groups WHERE id = ?", [id_group]);
        if(!group.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El grupo no existe"
            })
        }
        const [teacher] = await promisePool.query("SELECT id FROM teachers WHERE id = ?", [id_teacher]);
        if(!teacher.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El profesor no existe"
            })
        }
        await promisePool.query("INSERT INTO subjects SET ?", [{
            id: generateID(),
            id_group: group[0].id,
            id_teacher: teacher[0].id,
            name: name.trim(),
            assignation_link: assignation_link.trim()
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

async function deleteSubject(req = request, res = response){
    const { id } = req.params;
    try {
        const [subject] = await promisePool.query("SELECT id FROM subjects WHERE id = ?", [id]);
        if(!subject.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "La materia no existe"
            })
        }
        await promisePool.query("DELETE FROM subjects WHERE id = ?", [id]);
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Materia eliminada"
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

async function updateSubject(req = request, res = response){
    const {id} = req.params;
    const {name, assignation_link } = req.body;
    try {
        const [subject] = await promisePool.query("SELECT id FROM subjects WHERE id = ?", [id]);
        if(!subject.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "La materia no existe"
            })
        }
        await promisePool.query("UPDATE subjects SET name = ?, assignation_link = ? WHERE id = ?", [name.trim(), assignation_link.trim(), id]);
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Materia actualizada"
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

async function getSubject(req = request, res = response){
    const { id } = req.params;
    try {
        const [subject] = await promisePool.query("SELECT * FROM subjects WHERE id = ?", [id]);
        if(!subject.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "La materia no existe"
            })
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            subject
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
    createSubject,
    deleteSubject,
    updateSubject,
    getSubject
}