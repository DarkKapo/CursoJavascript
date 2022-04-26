//Importar pg
const { Pool } = require('pg')

//instanciar pool
const pool = new Pool({
    user: "rodrigo",
    host: "localhost",
    password: "1q2w3e4r",
    port: 5432,
    database: "repertorio"
})

//Función insertar
const insertar = async (datos) => {
    //Consulta parametrizada
    const consulta = {
        text: "INSERT INTO canciones (titulo, artista, tono) values ($1, $2, $3)",
        values: datos
    }

    const result = await pool.query(consulta)
    return result
}

//Función consultar
const consultar = async () => {
    const result = await pool.query("SELECT * FROM canciones")
    return result
}

//Función editar
const editar = async (datos) => {
    const consulta = {
        text: `UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4`,
        values: datos
    }
    const result = await pool.query(consulta)
    return result
}

//Función eliminar
const eliminar = async (id) => {

    const result = await pool.query(`DELETE FROM canciones WHERE id = ${id}`)
    return result
}

//Exportar
module.exports = { insertar, consultar, editar, eliminar }