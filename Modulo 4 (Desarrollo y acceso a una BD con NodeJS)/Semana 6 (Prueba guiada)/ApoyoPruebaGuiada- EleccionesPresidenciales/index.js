//Importar express
const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, console.log("Server UP"))

const { guardarCandidato, getCandidatos, editCandidato, eliminarCandidato, registrarVotos, getHistorial } = require("./consulta")

//Middleware
app.use(express.json())

app.get("/", (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

//Disponibiliza ruta para guardar un candidato
app.post("/candidato", async (req, res) => {
    try {
        const candidato = req.body
        const result = await guardarCandidato(candidato)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Disponibiliza ruta para obtener los candidatos
app.get("/candidatos", async (req, res) => {
    try {
        const candidatos = await getCandidatos()
        res.json(candidatos)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put("/candidato", async (req, res) => {
    try {
        const candidato = req.body
        const result = await editCandidato(candidato)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Disponibiliza ruta para eliminar un candidato
app.delete("/candidato", async (req, res) => {
    try {
        const { id } = req.query
        await eliminarCandidato(id)
        res.send('Candidato eliminado')
    } catch (error) {
        res.status(500).send(error)
    }
})

//Disponibiliza ruta para registrar un voto
app.post("/votos", async(req, res) => {
    try {
        const voto = req.body
        const result = await registrarVotos(voto)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Disponibiliza ruta para obtener el historial de votos
app.get("/historial", async (req, res) => {
    try {
        const historial = await getHistorial()
        res.json(historial)
    } catch (error) {
        res.status(500).send(error)
    }
})