//importar pg
const { Pool } = require('pg')

const config = {
    user: 'user',
    password: 'password',
    host: 'localhost',
    database: 'always_music',
    port: 5432
}

const pool = new Pool(config)

//Guardar argumentos de la consola
const argumentos = process.argv.slice(2)
const funcion = argumentos[0]
const nombre = argumentos[1]
const rut = argumentos[2]
const curso = argumentos[3]
const nivel = argumentos[4]

//Funcion agregar estudiante
const nuevoEstudiante = async () => {
    try {
        await pool.query(`insert into estudiantes(nombre, rut, curso, nivel) values('${nombre}', '${rut}', '${curso}', '${nivel}')`)

        console.log(`Estudiante ${nombre} agregado`)
    } catch (e) {
        console.log(e.code)
    }finally{
        pool.end()
    }
}

//Funcion editar estudiante
const editarEstudiante = async () => {
    try {
        await pool.query(`update estudiantes set nombre= '${nombre}', curso='${curso}', nivel='${nivel}' where rut ='${rut}'`)

        console.log(`Registro actualizado para ${nombre}`)
        pool.end()
    } catch (e) {
        console.log(e.code)
        pool.end()
    }
}

//Funcion consultar estudiantes
const consultaEstudiantes = async () => {
    try {
        const res = await pool.query(`select * from estudiantes`)
        console.log('Registro actual ', res.rows)
        pool.end()
    } catch (e) {
        console.log(e.code)
        pool.end()
    }
}

//Funcion consultar estudiante por rut
const rutEstudiante = async () => {
    try {
        const res = await pool.query(`select * from estudiantes where rut='${rut}'`)
        console.log(res.rows)
        pool.end()
    } catch (e) {
        console.log(e.code)
        pool.end()
    }
}

//Funcion eliminar estudiante
const eliminarEstudiante = async () => {
    try {
        const res = await pool.query(`delete from estudiantes where rut='${rut}'`)
        console.log(`Estudiante con rut ${rut} fue eliminado`)
        pool.end()
    } catch (e) {
        console.log(e.code)
        pool.end()
    }
}

//funcion IIFE
(async () => {
    if (funcion === 'nuevo') 
    {
        await nuevoEstudiante()
    }else if(funcion === 'consulta')
    {
        await consultaEstudiantes()
    }else if(funcion === 'editar')
    {
        await editarEstudiante()
    }else if (funcion === 'rut')
    {
        await rutEstudiante()
    }else if(funcion === 'eliminar')
    {
        await eliminarEstudiante()
    }
    else{
        console.log('Funcion ingresada no se encuentra registrada')
    }
})()