const express = require('express')
const app = express()
//constante de handlebars
const exphbs = require('express-handlebars')
//constante file upload
const expressFileUpload = require('express-fileupload')
//Importar jwt
const jwt = require("jsonwebtoken");
const secretKey = "pruebaskate";
//Importar las funciones de las consultas a la base de datos
const { agregarUsuario, obtenerUsuarios, modificarEstado, obtenerUsuario, actualizarUsuario, borrarUsuario } = require('./consultas')

app.listen(3000, console.log("Server UP"))
app.use(express.json());

//Configuracion handlebars
app.engine("handlebars", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/layout`,
}))

app.set('view engine', 'handlebars')

//disponibilizar la carpeta public, bootstrap y axios
app.use(express.static('public'))
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/'))
app.use('/axios', express.static('node_modules/axios/dist'))

//Middleware para usar fileupload
app.use(
    expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: "Peso excedido"
    })
)

//Ruta raiz
app.get('/', async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios()
        res.render("index", { usuarios })
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error ... ${e}`
        })
    }
})

//Ruta registro
app.get('/registro', (req, res) => {
    res.render("Registro")
})

//Ruta login
app.get('/login', (req, res) => {
    res.render("Login")
})

//Ruta para validar inicio de sesión
app.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const usuario = await obtenerUsuario(email, password)
        const token = jwt.sign(usuario, secretKey)

        res.status(201).redirect(`/datos?token=${token}`)
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Usuario y/o contraseña incorrecto ... ${e}`
        })
    }
})

//Ruta editar perfil
app.get('/datos', (req, res) => {
    const { token } = req.query
    //Verificar token
    jwt.verify(token, secretKey, (err, usuario) => {
        err ? res.status(401).send(
            res.send({
                error: "401 no autorizado",
                message: "No puede acceder a esta sección",
                token_error: err.message,
            })
        )
        : res.render("Datos", { usuario })
    })
})

//Ruta administrador
app.get('/admin', async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios()
        res.render("Admin", { usuarios })
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error ... ${e}`
        })
    }
})

//Ruta para agregar un usuario
app.post('/usuarios', async (req, res) => {
    //Extraer datos, al ser muchas variables es mejor usar 1 constante
    const usuario = req.body
    //Verifica si existe una imagen
    if (req.files === null) {
        return res.status(400).send({ code: 400, error: "No hay imagen cargada"})
    }

    const { foto } = req.files
    const { name } = foto
    
    //Guardar imagen
    foto.mv(`${__dirname}/public/uploads/${name}`, async (err) => {
        try {
            if(err) throw err
            //agrega atributo foto para la base de datos
            usuario.foto = name
            await agregarUsuario(usuario)
            res.status(201).redirect('/login')
        } catch (e) {
            res.status(500).send({
                code: 500,
                error: `Tenemos un error ... ${e}`
            })
        }
    })
})

//Ruta para mostrar los usuarios registrados
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios()
        res.status(200).send(usuarios);
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error ... ${e}`
        })
    }
})

//Ruta para modificar la autorización
app.put('/usuarios/estado/:id', async (req, res) => {
    //Extraer variables
    const { id } = req.params
    const { estado } = req.body

    try {
        await modificarEstado(id, estado)
        res.status(200).send({ status: 200, message: "Estado cambiado con éxito"})
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error ... ${e}`
        })
    }
})

//Ruta para modificar un usuario
app.put('/usuarios', async (req, res) => {
    const usuario = req.body
    
    try {
        await actualizarUsuario(usuario)
        res.status(200).send({ status: 200, message: "Datos actualizados con éxito"})
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error ... ${e}`
        })
    }
})

//Ruta para eliminar un usuario
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        await borrarUsuario(id)
        res.status(200).send()
    } catch (e) {
        res.status(500).send({
            code: 500,
            error: `Tenemos un error ... ${e}`
        })
    }
})