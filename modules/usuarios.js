const { Pool } = require('pg');

const config = {
    user: process.env.USERDB,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
}

const pool = new Pool(config);

// Usuarios
const insertar = async (payload) => {
    /*Agregar Posts */
    const text = 'INSERT INTO skaters (email, nombre ,password,anos_experiencia,especialidad,foto,estado ) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *'
    const values = [payload.email, payload.nombre, payload.password, payload.anos_experiencia, payload.especialidad, 2, 'ok']


    const result = await pool.query(text, values)
    return result
}
module.exports = { insertar }