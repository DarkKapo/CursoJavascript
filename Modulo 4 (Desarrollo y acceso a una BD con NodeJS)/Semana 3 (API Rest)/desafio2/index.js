//Importar express
const express = require('express')
const app = express()
//Importar fs
const fs = require('fs')

//Variable para guardar el servidor
const server =

//Colocar el server al escucha
app.listen(3000, console.log('Servidor en puerto 3000'))

//Disponibiliza la ruta raiz
app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html')
    //Lee el archivo html
    fs.readFile('index.html', 'utf8', (err, data) => {
        res.end(data)
    })
})

//Disponibiliza la ruta deportes
app.get('/deportes', (req, res) => {
    fs.readFile('deportes.json', 'utf8', (err, data) => {
        res.end(data)
    })
})

//Middleware
app.use('/agregar', express.json())
//Disponibiliza la ruta agregar
app.post('/agregar', (req, res) => {
    const { nombre, precio } = req.body

    //if para comprobar que los datos no sean vacios
    if (nombre != "" && precio != "") 
    {
        //Lee el archivo deportes.json y luego agrega los datos
        fs.readFile('deportes.json', 'utf8', (err, data) => {
            const deportes = JSON.parse(data).deportes
    
            deportes.push({ nombre, precio })
    
            fs.writeFile('deportes.json', JSON.stringify({deportes}), (err, data) => {
                err ? console.log("Error") : console.log("Agregado")
                res.end("Deporte agregado")
            })
        })
    }else
    {
        res.end("Rellene todos los campos")
    }
})

app.use('/editar', express.json())
//Disponibiliza la ruta editar
app.put('/editar', (req, res) => {
    const { nombre, precio } = req.body

    //if que verifica que el precio no sea un campo vacio
    if (precio != "") 
    {
        //Lee el archivo deportes.json, busca por el nombre y luego modifica el precio
        fs.readFile('deportes.json', 'utf8', (err, data) => {
            let deportes = JSON.parse(data).deportes
    
            deportes = deportes.map((dep) => {
                if(dep.nombre == nombre)
                {
                    dep.precio = precio
                    return dep
                }
                return dep
            })
    
            fs.writeFile('deportes.json', JSON.stringify({deportes}), (err, data) => {
                err ? console.log("Error") : console.log("Editado");
                res.end("Precio editado")
            })
        })
    }else
    {
        res.end("Ingrese un valor")
    }
})

//Disponibiliza la ruta eliminar
app.delete('/eliminar', (req, res) => {
    const { nombre } = req.query

    //Lee el archivo deportes.json, filtra por el nombre y guarda la lista
    fs.readFile('deportes.json', 'utf8', (err, data) => {
        let deportes = JSON.parse(data).deportes

        deportes = deportes.filter((dept) => dept.nombre !== nombre )

        fs.writeFile('deportes.json', JSON.stringify({deportes}), (err, data) => {
            err ? console.log("Error") : console.log("eliminado");
            res.end("Deporte eliminado")
        })
    })
})

module.exports = server