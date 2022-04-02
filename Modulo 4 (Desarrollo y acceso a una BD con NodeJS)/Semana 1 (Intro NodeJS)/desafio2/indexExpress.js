//Usar express
const express = require('express')
const app = express();
const fs = require('fs');

app.listen(8080, () => {
    console.log('Servidor iniciado en puerto 8080');
})

//Disponibilizar la ruta
app.get('/', (req, res) => {
    
    fs.readFile('index.html', 'utf8', (err, data) => {
        res.send(data)
    })
    
})

//Configura ruta crear
app.get('/crear', (req, res) => {
    const { archivo, contenido } = req.query
    fs.writeFile(archivo, contenido, 'utf8', () => {
        res.send(`El archivo ${archivo} fue creado`)
    })
})

//configura ruta consultar
app.get('/leer', (req, res) => {
    const { archivo } = req.query
    //Obtener fecha
    let fecha = new Date();

    //Descomponer datos
    let dia = fecha.getDate()
    let mes = fecha.getMonth() + 1
    let anio = fecha.getFullYear()

    fs.readFile(archivo, 'utf8', (err, data) => {
        if(mes < 10)
        {
            res.send(`${dia}/0${mes}/${anio} ${data}`)
        }else{
            res.send(`${dia}/${mes}/${anio} ${data}`)
        }
    })
})

//Configura ruta renombrar
app.get('/renombrar', (req, res) => {
    const { nombre, nuevoNombre } = req.query
    fs.rename(nombre, nuevoNombre, (err, data) => {
        res.send(`Archivo ${nombre} fue renombrado a ${nuevoNombre}`)
    })
})

//Configura ruta eliminar
app.get('/eliminar', (req, res) => {
    const { archivo } = req.query

    //Valida si existe el archivo
    let valida = fs.existsSync(archivo)

    if(valida == true)
    {
        fs.unlink(archivo, (err, data) => {
            setTimeout( () => {
                res.send(`Archivo ${archivo} fue eliminado`)
            }, 3000)
        })
    }else{
        res.send(`Archivo ${archivo} no existe`)
    }
})