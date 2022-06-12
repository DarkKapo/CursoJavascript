const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const expressFileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const secretKey = "shhhh"
//Importar archivo consultas
const { nuevoUsuario, getUsuarios, setUsuarioStatus, getUsuario } = require('./consultas')
const send = require('./correo')

app.listen(3000, console.log('Server Up'))

//Middleware
app.use(bodyParser.urlencoded( { extended: false }))
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(
    expressFileUpload({
        limits: 5000000,
        abortOnLimit: true,
        responseOnLimit: "El tamaño de la imagen excede el permitido"
    })
)
//Disponibilizar bootstrap
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/'))

//Disponibilizar axios
app.use('/axios', express.static('node_modules/axios/dist'))

app.engine(
    "handlebars",
    exphbs.engine({
        defaultLayout: "main",
        layoutsDir: `${__dirname}/views/mainLayout`,
    })
)

app.set("view engine", "handlebars")

//Ruta raiz
app.get('/', (req, res) => {
    res.render('Home')
})

//Ruta usuarios
app.post('/usuarios', async (req, res) => {
    const { email, nombre, password } = req.body

    try {
        const usuario = await nuevoUsuario(email, nombre, password)
        res.status(201).send(usuario)
    } catch (e) {
        res.status(500).send({
            error: `algo salio mal... ${e}`,
            code: 500
        })
    }
})

//Ruta put
app.put('/usuarios', async (req, res) => {
    const { id, auth } = req.body

    try {
        const usuario = await setUsuarioStatus(id, auth)
        res.status(200).send(usuario)
    } catch (e) {
        res.status(500).send({
            error: `algo salio mal...${e}`,
            code: 500
        })
    }
})

//Ruta admin
app.get('/Admin', async(req, res) => {
    try {
        const usuarios = await getUsuarios()
        res.render("Admin", { usuarios })
    } catch (e) {
        res.status(500).send({
            error: `algo salio mal... ${e}`,
            code: 500
        })
    }
})

//Ruta login
app.get('/login', (req, res) => {
    res.render("Login")
})

//Ruta verify
app.post('/verify', async (req, res) => {
    const { email, password } = req.body
    const user = await getUsuario(email,password)

    if (user) {
        if (user.auth) {
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 180,
                    data: user
                },
                secretKey
            )
            res.send(token)
        }else{
            res.status(401).send ({
                error: "Usuario no validado para subir imágenes",
                code: 401
            })
        }
    }else{
        res.status(404).send({
            error: "Usuario no registrado",
            code: 404,
        })
    }
})

//Ruta evidencias
app.get('/Evidencias', (req, res) => {
    const { token } = req.query
    jwt.verify(token, secretKey, (err, decoded) => {
        const { data } = decoded
        const { nombre, email } = data

        err ? res.status(401).send(
            res.send({
                error: "401 no autorizado",
                message: "No puede acceder a esta sección",
                token_error: err.message,
            })
        )
        : res.render("Evidencias", { nombre, email })
    })
})

//Ruta para enviar el correo
app.post('/upload', (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No se encuentra el archivo")
    }
    const { files } = req
    const { foto } = files
    const { name } = foto
    const { email, nombre } = req.body
    console.log(email)

    foto.mv(`${__dirname}/public/uploads/${name}.jpg`, async (err) => {
        if (err) {
            return res.status(500).send({
                error: `Algo salió mal ... ${err}`,
                code: 500
            })
        }
        await send(email, nombre)
        res.send("Foto cargada")
    })
})