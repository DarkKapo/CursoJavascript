//Importar pg
const { Pool } = require('pg')

//instanciar pool
const pool = new Pool({
    user: "postgress",
    host: "localhost",
    password: "postgress",
    port: 5432,
    database: "bancosolar"
})

//Función para agregar un usuario
const agregarUsuario = async (usuario) => {
    const values = Object.values(usuario)
    const consulta = {
        text: "INSERT INTO usuarios (nombre, balance, estado) values ($1, $2, TRUE)",
        values
    }
    const result = await pool.query(consulta)
    return result
}

//Función para mostrar los usuarios
const mostrarUsuarios = async () => {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE estado = TRUE")
    return rows
}

//Función para editar un usario
const editarUsuario = async (usuario) => {
    const values = Object.values(usuario)
    const consulta = {
        text: "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *",
        values
    }
    const { rows } = await pool.query(consulta)
    return rows
}

//Función para eliminar un candidato
const eliminarUsuario = async (id) => {
    const { rows } = await pool.query(`UPDATE usuarios SET estado = FALSE WHERE id = ${id}`)
    return rows
}

//Función para realizar una transferencia
const transferenciaUsuario = async (datos) => {
    try {
        const values = Object.values(datos)
        await pool.query("BEGIN")
        //Agregar transferencia
        const agregarTransferencia = {
            text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, now())",
            values:[Number(values[0]), Number(values[1]), Number(values[2])]
        }
        const transferenciaOK = await pool.query(agregarTransferencia)
        
        //Descontar usuario origen
        const descontar = {
            text: "UPDATE usuarios SET balance = balance - $2 WHERE id = $1 RETURNING *",
            values: [Number(values[0]), Number(values[2])]
        }
        const descuentoOK = await pool.query(descontar)

        //Aumentar cuenta destino
        const aumento = {
            text: "UPDATE usuarios SET balance = balance + $2 WHERE id = $1 RETURNING *",
            values: [Number(values[1]), Number(values[2])]
        }
        const aumentoOK = await pool.query(aumento)
        await pool.query("COMMIT")
    } catch (error) {
        //Agregar ROLLBACK
        await pool.query("ROLLBACK")

        // Códigos de error
        console.log("Error código: " + e.code)
        console.log("Detalle del error: " + e.detail)
        console.log("Tabla originaria del error: " + e.table)
        console.log("Restricción violada en el campo: " + e.constraint)
    }
}

//Función que retorna las transferencias
const listaTransferencias = async () => {
    const consulta = {
        text: "SELECT (SELECT nombre FROM usuarios WHERE t.emisor = usuarios.id) as emis, (SELECT nombre FROM usuarios WHERE t.receptor = usuarios.id) as recep, t.monto, t.fecha FROM transferencias as t",
        rowMode: "array"
    }
    const { rows } = await pool.query(consulta)
    return rows
}

//Exportar
module.exports = { agregarUsuario, mostrarUsuarios, editarUsuario, eliminarUsuario, transferenciaUsuario, listaTransferencias }