//Importar pg
const{ Pool } = require('pg')

//instanciar pool
const pool = new Pool({
    user: "admin",
    host: "localhost",
    password: "password",
    port: 5432,
    database: "likeme"
})

//Función que agregar un post
const agregarPost = async (datos) => {
    const values = Object.values(datos)
    const consulta = {
        text: "INSERT INTO posts (usuario, url, descripcion, likes) values ($1, $2, $3, 0)",
        values
    }
    const result = await pool.query(consulta)
    return result
}

//Función que muestra los posts
const mostrarPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
}

//Función que agrega un like
const sumarLike = async (like) => {
    const values = Object.values(like)
    const consulta = {
        text: "update posts set likes = likes + 1 where id = $1",
        values: [Number(values[0])]
    }
    const result = await pool.query(consulta)
    return result
}

//Exportar funciones
module.exports = { agregarPost, mostrarPosts, sumarLike }