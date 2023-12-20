const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");

async function createGroup (req = request, res = response){
    const {id_school, id_teacher} = req.params;
    const {name} = req.body;
    try {
        const [school] = await promisePool.query("SELECT id FROM school WHERE id = ?", [id_school]);
        if(!school.length){
            return res.status(400).json({
                ok: false,
                status:400,
                msg: "La escuela no existe"
            })
        }
        const [teacher] = await promisePool.query("SELECT id FROM teachers WHERE id = ?", [id_teacher]);
        if(!teacher.length){
            return res.status(400).json({
                ok: false,
                status:400,
                msg: "El profesor no existe"
            })
        }
        await promisePool.query("INSERT INTO groups SET ?", [{
            id: generateID(),
            id_school: school[0].id,
            id_teacher: teacher[0].id,
            name: name.trim()
        }])
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Grupo insertado"
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

async function getGroupById (req = request, res = response){
    const { id } = req.params;
    try {
        const [group] = await promisePool.query("SELECT * FROM groups WHERE id = ?", [id]);
        if(!group.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El grupo no existe"
            })
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            group: group[0]
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

async function deleteGroup (req = request, res = response){
    const { id } = req.params;
    try {
        const [group] = await promisePool.query("SELECT id FROM groups WHERE id = ?", [id]);
        if(!group.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El grupo no existe"
            })
        }
        await promisePool.query("DELETE FROM groups WHERE id = ?", [id]);
        await promisePool.query("DELETE FROM califications WHERE id_group = ?", [id]);
        await promisePool.query("DELETE FROM students WHERE id_group = ?", [id]);
        await promisePool.query("DELETE FROM subjects WHERE id_group = ?", [id]);
        await promisePool.query("DELETE FROM subpoenas WHERE id_group = ?", [id]);
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Grupo eliminado"
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

async function updateGroup (req = request, res = response){
    const { id } = req.params;
    const { name } = req.body;
    try {
        const [group] = await promisePool.query("SELECT id FROM groups WHERE id = ?", [id]);
        if(!group.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "El grupo no existe"
            })
        }
        await promisePool.query("UPDATE groups SET name = ? WHERE id = ?", 
        [name.trim(), 
        id
    ]);
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Grupo actualizado"
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

module.exports = {
    createGroup,
    getGroupById,
    deleteGroup,
    updateGroup
}