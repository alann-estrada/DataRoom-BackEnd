const mysql = require('mysql2');

const pool = mysql.createPool(process.env.DATABASE_URL);
console.log('Connected to database');
const promisePool = pool.promise();

module.exports = promisePool;