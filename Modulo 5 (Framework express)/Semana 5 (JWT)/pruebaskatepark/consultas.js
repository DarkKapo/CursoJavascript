const { Pool } = require('pg')
//Configuración
const pool = new Pool({
    user: "postgress",
    host: "localhost",
    password: "postgress",
    database: "skatepark",
    port: 5432,
})

//Función que agrega un usuario a la base de datos
const agregarUsuario = async (usuario) => {
    const values = Object.values(usuario)
    const result = await pool.query(`INSERT INTO skaters(email, nombre, password, anos_experiencia, especialidad, foto, estado) values ($1,$2, $3, $4 ,$5, $6, false) RETURNING *`, values)
    
    return result.rows[0]
}

//Función que obtiene los usuarios
const obtenerUsuarios = async () => {
    const result = await pool.query('SELECT * FROM skaters')
    return result.rows
}

//Función para modificar el estado de un usuario
const modificarEstado = async (id, estado) => {
    const result = await pool.query(`UPDATE skaters SET estado = ${estado} WHERE id = ${id} RETURNING *`)
    const usuario = result.rows[0]
    return usuario
}

//Función para obtener 1 usuario
const obtenerUsuario = async (email, password) => {
    const result = await pool.query(`SELECT * FROM skaters WHERE email = '${email}' AND password = '${password}'`)
    return result.rows[0]
}

//Función para actualizar un usuario
const actualizarUsuario = async(usuario) => {
    const values = Object.values(usuario)
    const result = await pool.query(`UPDATE skaters SET nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 WHERE email = $1 RETURNING *`, values)
    
    return result.rows[0]
}

//Función que borra 1 usuario
const borrarUsuario = async(id) => {
    const result = await pool.query(`DELETE FROM skaters WHERE id = ${id} RETURNING *`)
    const usuario = result.rows[0]
    return usuario
}

module.exports = { agregarUsuario, obtenerUsuarios, modificarEstado, obtenerUsuario, actualizarUsuario, borrarUsuario }