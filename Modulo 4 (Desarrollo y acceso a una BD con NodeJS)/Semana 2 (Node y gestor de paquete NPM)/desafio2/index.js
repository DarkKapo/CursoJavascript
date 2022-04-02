//express
const express = require('express')
const app = express()
const fs = require('fs')
//jimp
const Jimp = require('jimp')
//uuid
const { v4:uuidv4 } = require('uuid')

app.listen(3000, console.log('Servidor en puerto 3000'))

//Disponibilizar la ruta del index
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Disponilbilizar CSS
app.get('/style', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/css'})
    fs.readFile(__dirname + '/assets/style.css', 'utf8', (err, css) => {
        res.write(css)
        res.end()
    })
})

app.get('/upload', (req, res) => {
    const { nombre } = req.query
    let nombreImg = ''

    Jimp.read(nombre, (err, imagen) => {
        nombreImg = uuidv4().slice(0,6) + '.jpg'
        imagen.resize(350, Jimp.AUTO).greyscale().quality(60).writeAsync(nombreImg).then(() => {
            fs.readFile(nombreImg, (err, Imagen) => {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                console.log('PID = ', process.pid)
                res.end(Imagen)
            })
        })
    })
})