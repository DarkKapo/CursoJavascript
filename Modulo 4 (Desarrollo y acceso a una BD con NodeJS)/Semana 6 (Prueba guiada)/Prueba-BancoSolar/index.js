const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, console.log("Server iniciado en puerto 3000"))

//Importar consultas
const { agregarUsuario, mostrarUsuarios, editarUsuario, eliminarUsuario, transferenciaUsuario, listaTransferencias } = require('./consultas')

//Agregar middleware
app.use(express.json())

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

//Ruta que agrega un usuario
app.post('/usuario', async (req, res) => {
    try {
        const usuario = req.body
        const result = await agregarUsuario(usuario)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta que muestra los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const candidatos = await mostrarUsuarios()
        res.status(201).json(candidatos)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta para editar un usuario
app.put('/usuario', async (req, res) => {
    try {
        const candidato = req.body
        const result = await editarUsuario(candidato)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta para eliminar un usuario
app.delete('/usuario', async (req, res) => {
    try {
        const { id } = req.query
        await eliminarUsuario(id)
        res.send('Usuario eliminado')
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta para hacer transferencias
app.post('/transferencia', async (req, res) => {
    try {
        const datos = req.body
        const result = await transferenciaUsuario(datos)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta que devuelve las transferencias
app.get('/transferencias', async (req, res) => {
    try {
        const totalTansferencias = await listaTransferencias()
        res.status(201).json(totalTansferencias)
    } catch (error) {
        res.status(500).send(error)
    }
})