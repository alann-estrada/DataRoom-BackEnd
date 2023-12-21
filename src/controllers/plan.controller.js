const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const generateID = require('../utils/generateID.js');
const promisePool = require("../database/connect.js");


async function updatePlan (req = request, res = response){
    const {id} = req.params;

    try {
        const [school] = await promisePool.query("SELECT id FROM school WHERE id = ?", [id]);
        if(!school.length){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: "La escuela no existe"
            })
        }
        await promisePool.query("UPDATE plan SET ?", [{
            id_plan: id_plan.trim(),
        }])
        return res.status(200).json({
            ok:true,
            status:200,
            msg: "Plan actualizado"
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
    updatePlan
}