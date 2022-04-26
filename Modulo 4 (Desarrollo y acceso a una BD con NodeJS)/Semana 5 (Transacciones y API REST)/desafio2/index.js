//Importar express y levantar servidor
const express = require('express')
const app = express()
const { insertar, consultar, editar, eliminar } = require('./consultas')

app.listen(3000, console.log("Servidor iniciado en puerto 3000"))

//middleware
app.use(express.json())

//Disponibilizar la ruta raiz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Diponibilizar ruta post
app.post('/cancion', async (req, res) => {
    try {
        const datos = Object.values(req.body)
        const respuesta = await insertar(datos)
        res.json(respuesta)
    } catch (error) {
        console.log(error)
    }
})

//Disponibilizar ruta get
app.get('/canciones', async (req, res) => {
    try {
        const registros = await consultar()
        res.json(registros)
    } catch (error) {
        res.status(500).send("Error desconocido, vuelva a intentar")
    }
})

//Disponibilzar la ruta put
app.put('/cancion/:id', async(req, res) => {
    
    try {
        const datos = Object.values(req.body)
        datos.push(req.params.id)
        const respuesta = await editar(datos)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Error desconocido, vuelva a intentar")
    }
})

//Disponibilizar la ruta delete
app.delete('/cancion/:id', async(req, res) => {
    try {
        const respuesta = await eliminar(req.params.id)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Error desconocido, vuelva a intentar")
    }
})