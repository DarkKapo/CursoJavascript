//Importar pg
const { Pool } = require('pg')

//Objeto de configuracion
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

//Funcion consultar estudiantes
const consultaEstudiantes = async () => {
    try {
        //Objeto para luego pasarlo como parametro
        const SQLQuery = {
            rowMode: 'array',
            text: 'select * from estudiantes'
        }
        const res = await pool.query(SQLQuery)
        console.log('Registro actual: ', res.rows)
    } catch (e) {
        console.log(e.code)        
    }finally{
        pool.end()
    }
}

//Funcion agregar estudiante
const nuevoEstudiante = async () => {
    try {
        //Consulta SQL con JSON
        const SQLQuery = {
            text: 'insert into estudiantes(nombre, rut, curso, nivel) values($1, $2, $3, $4) RETURNING *',
            values: [nombre, rut, curso, nivel],
        }

        const res = await pool.query(SQLQuery)
        console.log(res.rows[0])
    } catch (e) {
        console.log(e.code) 
    }finally{
        pool.end()
    }
}

//Funcion editar estudiante
const editarEstudiante = async () => {
    //Consulta SQL con JSON para editar un registro
    try {
        const SQLQuery = {
            text: 'update estudiantes set nombre= $1, curso= $3, nivel= $4 where rut= $2',
            values: [nombre, rut, curso, nivel],
        }

        await pool.query(SQLQuery)
        console.log(`Registro actualizado para ${nombre}`)
    } catch (e) {
        console.log(e.code) 
    }finally{
        pool.end()
    }
}

//Funcion consultar estudiante por rut
const rutEstudiante = async () => {
    //Consulta SQL con JSON con el rut
    try {
        const SQLQuery = {
            rowMode: 'array',
            text: 'select * from estudiantes where rut = $1',
            values: [rut],
        }

        const res = await pool.query(SQLQuery)
        console.log(res.rows[0])
    } catch (e) {
        console.log(e.code)
    }finally{
        pool.end()
    }
}

//Funcion eliminar estudiante
const eliminarEstudiante = async () => {
    //Consulta SQL con JSON para eliminar por rut
    try {
        const SQLQuery = {
            text: 'delete from estudiantes where rut= $1',
            values: [rut],
        }

        await pool.query(SQLQuery)
        console.log(`Estudiante con rut ${rut} fue eliminado`)
    } catch (e) {
        console.log(e.code)
    }finally{
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