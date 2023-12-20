const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");

async function createShcool (req = request, res = response){
    const {name, director, cp, direction, level, turn, id_plan} = req.body;
    if(!name || !director ||!cp || !direction || !level || !turn || !id_plan){
        return res.status(400).json({
            ok: false,
            status:400,
            msg: "Faltan datos"
        })
    }
    try {
        const [plan] = await promisePool.query("SELECT id FROM plans WHERE id = ?", [id_plan]);
        if(!plan.length){
            return res.status(404).json({
                ok: false,
                status:404,
                msg: "El plan no existe"
            })
        }
        await promisePool.query("INSERT INTO school SET ?", [{
            id: generateID(),
            name: name.trim(),
            director_full_name: director.trim(),
            cp: cp.trim(),
            direction: direction.trim(),
            level:level.trim(),
            turn: turn.trim(),
            id_plan: id_plan.trim()
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

async function getSchoolById (req = request, res = response){
    const { id } = req.params;
    try {
        const [school] = await promisePool.query("SELECT * FROM school WHERE id = ?", [id]);
        if(!school.length){
            return res.status(400).json({
                ok: true,
                status: 400,
                msg: "No se encontro la escuela"
            })
        }
        const [teachers] = await promisePool.query("SELECT * FROM teachers WHERE id_school = ?", [id]);
        if(!teachers.length){
            return res.status(400).json({
                ok: true,
                status: 400,
                msg: "La escuela no cuenta con maestros"
            })
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: "Escuela encontrada",
            school,
            teachers
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

async function deleteSchool (req = request, res = response){
    const {id} = req.params;
    try {
        const [school] = await promisePool.query("SELECT id FROM school WHERE id = ?", [id]);
        if(!school.length){
            return res.status(400).json({
                ok: true,
                status: 400, 
                msg: "No se encontro la escuela"
            })
        }
        await promisePool.query("DELETE FROM school WHERE id = ?", [id]);
        await promisePool.query("DELETE FROM teachers WHERE id_school = ?", [id]);
        await promisePool.query("DELETE FROM students WHERE id_school = ?", [id]);
        await promisePool.query("DELETE FROM groups WHERE id_school = ?", [id]);
        await promisePool.query("DELETE FROM subjects WHERE id_school = ?", [id]);
        await promisePool.query("DELETE FROM calification WHERE id_school = ?", [id]);
        await promisePool.query("DELETE FROM subpoenas WHERE id_school = ?", [id]);
        await promisePool.query("DELETE FROM tutors WHERE id_school = ?", [id]);
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Infomación de la escuela eliminada"
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

async function updateSchool (req = request, res = response){
    const {id} = req.params;
    const {name, director, cp, direction, level, turn, id_plan} = req.body;
    if(!name || !director ||!cp || !direction || !level || !turn || !id_plan){
        return res.status(400).json({
            ok: false,
            status:400,
            msg: "Faltan datos"
        })
    }
    try {
        const [school] = await promisePool.query("SELECT id FROM school WHERE id = ?", [id]);
        if(!school.length){
            return res.status(404).json({
                ok: false,
                status:404,
                msg: "La escuela no existe"
            })
        }
        const [plan] = await promisePool.query("SELECT id FROM plans WHERE id = ?", [id_plan]);
        if(!plan.length){
            return res.status(404).json({
                ok: false,
                status:404,
                msg: "El plan no existe"
            })
        }
        await promisePool.query("UPDATE school SET ? WHERE id = ?", [{
            name: name.trim(),
            director_full_name: director.trim(),
            cp: cp.trim(),
            direction: direction.trim(),
            level:level.trim(),
            turn: turn.trim(),
            id_plan: id_plan.trim()
        }, id])
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Escuela actualizada"
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
    createShcool,
    getSchoolById,
    deleteSchool,
    updateSchool
}