const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const promisePool = require('../database/connect.js');
const isAuthenticated = async (req = request, res = response, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(404).json({ message: 'No se ha encontrado el token' });
    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    const [usuario] = await promisePool.query('SELECT id, rol FROM users WHERE id = ?', [verify.id]);
    if (usuario.length) {
      req.user = usuario[0];
      return next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Acceso denegado' })
    return next(error);
  }
}
module.exports = isAuthenticated;