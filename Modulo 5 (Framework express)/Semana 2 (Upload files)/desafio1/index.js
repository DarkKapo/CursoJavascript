const express = require('express')
const expressFileUpload = require('express-fileupload')
const fs = require('fs')

const app = express()
//Middleware para usar fileupload
app.use(
    expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: "Peso excedido"
    })
)

app.listen(3000, console.log("SERVER UP"))

//Agregar middleware
app.use(express.json())

//Disponibilizar la carpeta imágenes
app.use(express.static('imgs'))

//Ruta raiz con el formulario
app.get('/', (req, res) => {
    fs.readFile('formulario.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

//Ruta imagen con el collage
app.get('/imagen', (req, res) => {
    fs.readFile('collage.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

//Ruta para guardar una imagen
app.post('/imagen', (req, res) => {
    //Extrae los parámetros
    const { target_file } = req.files
    const { posicion } = req.body

    //Guarda la imagen
    target_file.mv(`${__dirname}/imgs/imagen-${posicion}.jpg`, (err) => {
        if(err){
            console.log(err)
            res.status(500).send("Imagen excede el limite")
        }
    })
    //Redirecciona a la ruta get (la página se comporta extraña si no uso el redirect)
    res.redirect(301, '/imagen')
})

//Ruta para eliminar un imagen
app.delete('/imagen/:nombre', (req, res) => {
    const { nombre } = req.params
    fs.unlink(`${__dirname}/imgs/${nombre}`, (err) => {
        if(err)
            return res.status(500).send("Hubo un error")
        
        res.send({message: `Imagen ${nombre} eliminada`})
    })
})