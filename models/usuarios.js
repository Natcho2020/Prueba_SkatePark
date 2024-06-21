import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    user: process.env.USERDB,
    password: process.env.PASSWORD
})

// Usuarios
const insertar = async (payload, name) => {
    /*Agregar Posts */
    const text = 'INSERT INTO skaters (email, nombre ,password,anos_experiencia,especialidad,foto,estado ) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *'
    const values = [payload.email, payload.nombre, payload.password, payload.anos_experiencia, payload.especialidad, name, false]
    const result = await pool.query(text, values)
    return result
}
const consultar = async () => {

    const text = "SELECT * FROM skaters";
    const result = await pool.query(text)
    return result
}
const consultarSkater = async (data) => {
    const { email } = data
    const text = 'Select from skaters where email = $1';
    const values = [email]
    const result = await pool.query(text, values)

    return result
}
const updateStatus = async (id) => {
    const text = 'UPDATE skaters SET estado = $1 WHERE id = $2'
    const values = [true, id]

    const result = await pool.query(text, values)
    return result
}
const updateData = async (payload) => {
    const text = "UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4, estado = $5 WHERE email = $6 RETURNING *"
    const values = [payload.nombre, payload.password, payload.anos_experiencia, payload.especialidad, payload.estado, payload.email]
    const result = await pool.query(text, values)
    return result
}
const deleteData = async (payload) => {
    const text = 'DELETE FROM skaters WHERE email = $1'
    const values = [payload.email]
    const result = await pool.query(text, values)
    return result
}



export { insertar, consultar, consultarSkater, updateStatus, deleteData }