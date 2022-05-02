//Importar express
const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, console.log("Server iniciado en puerto 3000"))

//Importar funciones
const { agregarUsuario, mostrarUsuarios, loginOK } = require('./consultas')

//Agregar middleware
app.use(express.json())

//Ruta para disponibilizar el HTML
app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

//Ruta para agregar un usuario
app.post('/usuario', async (req, res) => {
    try {
        const persona = req.body
        const result = await agregarUsuario(persona)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta para mostrar los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const personas = await mostrarUsuarios()
        res.status(201).json(personas)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta para el login
app.post('/login', async (req, res) => {
    try {
        const datosLogin = req.body
        const result = await loginOK(datosLogin)
        console.log(`Resultado = ${result}`);
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})