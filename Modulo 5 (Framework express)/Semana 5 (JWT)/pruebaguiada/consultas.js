const res = require('express/lib/response')
const { Pool } = require('pg')
const { password } = require('pg/lib/defaults')

const pool = new Pool({
    user: "postgress",
    host: "localhost",
    password: "postgress",
    database: "nasa",
    port: 5432,
})

nuevoUsuario = async (email, nombre, password) => {
    const result = await pool.query(`INSERT INTO usuarios (email, nombre, password, auth) values('${email}', '${nombre}', '${password}', false) returning *`)
    
    const usuario = result.rows[0]
    return usuario
}

getUsuarios = async () => {
    const result = await pool.query('SELECT * FROM usuarios')
    return result.rows
}

setUsuarioStatus = async (id, auth) => {
    const result = await pool.query(`UPDATE usuarios SET auth = ${auth} WHERE id = ${id} RETURNING *`)

    const usuario = result.rows[0]
    return usuario
}

getUsuario = async (email, password) => {
    const result = await pool.query(`SELECT * FROM usuarios WHERE email = '${email}' AND password = '${password}'`)
    return result.rows[0]
}

//Exportar funcion
module.exports= { nuevoUsuario, getUsuarios, setUsuarioStatus, getUsuario }