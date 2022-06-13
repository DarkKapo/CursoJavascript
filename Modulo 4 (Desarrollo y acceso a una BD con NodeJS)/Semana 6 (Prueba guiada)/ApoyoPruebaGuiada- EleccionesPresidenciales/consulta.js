//Importar pg
const res = require('express/lib/response')
const { Pool } = require('pg')

//instanciar pool
const pool = new Pool({
    user: "postgress",
    host: "localhost",
    password: "postgress",
    port: 5432,
    database: "elecciones"
})

const guardarCandidato = async(candidatos) => {
    const values = Object.values(candidatos)
    const consulta = {
        //0 es valor estatico porque cada candidato 
        text: "INSERT INTO candidatos (nombre, foto, color, votos) values ($1, $2, $3, 0)",
        values
    }
    const result = await pool.query(consulta)
    return result
}

const getCandidatos = async () => {
    const { rows } = await pool.query("SELECT * FROM candidatos")
    return rows
}

const editCandidato = async (candidato) => {
    const values = Object.values(candidato)
    const consulta = {
        text: "UPDATE candidatos SET nombre = $1, foto = $2 WHERE id = $3 RETURNING *",
        values
    }

    const { rows } = await pool.query(consulta)
    return rows
}

const eliminarCandidato = async (id) => {
    const { rows } = await pool.query(`DELETE FROM candidatos WHERE id = ${id}`)
    return rows
}

const registrarVotos = async (voto) => {
    const values = Object.values(voto)

    const consultaRegistrarVotoHistorial = {
        text: "INSERT INTO historial (estado, votos, ganador) values ($1, $2, $3)",
        values
    }

    const consultaRegistrarVotoCandidato = {
        text: "UPDATE candidatos SET votos = votos + $1 WHERE nombre = $2",
        values: [Number(values[1]), values[2]]
    }

    try {
        await pool.query("BEGIN")
        await pool.query(consultaRegistrarVotoHistorial)
        await pool.query(consultaRegistrarVotoCandidato)
        await pool.query("COMMIT")
        return true
    } catch (error) {
        await pool.query("ROLLBACK")
        throw error;
    }
}

const getHistorial = async () => {
    const consulta = {
        text: "SELECT * FROM historial",
        rowMode: "array"
    }
    const { rows } = await pool.query(consulta)
    return rows
}

//Exportar
module.exports = { guardarCandidato, getCandidatos, editCandidato, eliminarCandidato, registrarVotos, getHistorial }