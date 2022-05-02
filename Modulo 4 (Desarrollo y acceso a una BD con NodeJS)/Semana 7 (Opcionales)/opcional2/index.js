//Importar express
const express = require('express')
const app = express()
const fs = require('fs')

app.listen(3000, console.log("Server UP puerto 3000"))

//Importar funciones
const { agregarPost, mostrarPosts, sumarLike } = require('./consulta')

//Middleware
app.use(express.json())

//Ruta raiz
app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

//Ruta para agregar un post
app.post('/post', async (req, res) => {
    try {
        const datoPost = req.body
        const result = await agregarPost(datoPost)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta para mostrar posts
app.get('/posts', async (req, res) => {
    try {
        const datosPosts = await mostrarPosts()
        res.status(201).json(datosPosts)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Ruta para sumar likes
app.put('/post', async (req, res) => {
    try {
        const datos = req.query
        const result = await sumarLike(datos)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})