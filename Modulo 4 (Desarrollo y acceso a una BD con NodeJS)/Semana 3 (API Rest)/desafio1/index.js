const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, console.log('Servidor en puerto 3000'))

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html')
    fs.readFile('index.html', 'utf8', (err, data) => {
        res.end(data)
    })
})

app.get('/deportes', (req, res) => {
    fs.readFile('deportes.json', 'utf8', (err, data) => {
        res.end(data)
    })
})

app.use('/agregar', express.json())

app.post('/agregar', (req, res) => {
    const { nombre, precio } = req.body

    fs.readFile('deportes.json', 'utf8', (err, data) => {
        const deportes = JSON.parse(data).deportes

        deportes.push({ nombre, precio })

        fs.writeFile('deportes.json', JSON.stringify({deportes}), (err, data) => {
            err ? console.log("Error") : console.log("Agregado");
            res.end("Deporte agregado")
        })
    })
})

app.use('/editar', express.json())

app.put('/editar', (req, res) => {
    const { nombre, precio } = req.body

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
            err ? console.log("Error") : console.log("Agregado");
            res.end("Deporte agregado")
        })
    })
})

app.delete('/eliminar', (req, res) => {
    const {nombre} = req.query
    fs.readFile('deportes.json', 'utf8', (err, data) => {
        let deportes = JSON.parse(data).deportes
        deportes = deportes.filter((dept) => dept.nombre !== nombre )

        fs.writeFile('deportes.json', JSON.stringify({deportes}), (err, data) => {
            err ? console.log("Error") : console.log("eliminado");
            res.end("Deporte eliminado")
        })
    })
})