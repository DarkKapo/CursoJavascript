//Importar pg
const { Pool } = require('pg')

//instanciar pool
const pool = new Pool({
    user: "admin",
    host: "localhost",
    password: "password",
    port: 5432,
    database: "softlife"
})

//función para agregar un usuario
const agregarUsuario = async (persona) => {
    const values = Object.values(persona)
    const consulta = {
        text: "INSERT INTO usuarios (email, password) values ($1, $2)",
        values
    }
    const result = await pool.query(consulta)
    return result
}

//función para mostrar usuarios
const mostrarUsuarios = async () => {
    const { rows } = await pool.query("SELECT * FROM usuarios")
    return rows
}

//Función para el login
const loginOK = async (persona) => {
    const values = Object.values(persona)
    const consulta = {
        text: "select * from usuarios where (email = $1 and password = $2)",
        values
    }
    const { rows } = await pool.query(consulta)
    console.log(`${rows[0].email} - ${rows[0].password}`)
    //Si la consulta es correcta, retorna los datos (true)
    //Si la consulta es incorrecta, retorna campos vacíos (false)
    if(rows[0].email == '' || rows[0].password == '')
    {
        return false
    }else{
        return true
    }
}

//Exportar funciones
module.exports = { agregarUsuario, mostrarUsuarios, loginOK }