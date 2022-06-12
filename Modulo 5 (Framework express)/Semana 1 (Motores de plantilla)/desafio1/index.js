//Importar express
const express = require('express')
const app = express()
//Importar handlebars
const exphbs = require('express-handlebars')
const Handlebars = require("handlebars");

//Guada los productos que se muestran al hacer clic en el carro
let arrayCompra = []

app.listen(3000, console.log("Server UP puerto 3000"))

//middleware
app.use(express.json())

//Dejar la carpeta de las imágenes pública
app.use(express.static('imagenes'))

//Disponibilizar bootstrap
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/'))

//Disponibilizar axios
app.use('/axios', express.static('node_modules/axios/dist'))

//Disponibilizar handlebars
app.use('/handlebars', express.static('node_module/handlebars/dist'))

//Configurar handlebars
app.engine('handlebars', exphbs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/componentes",
}))

//Especificamos que usamos handlebars
app.set('view engine', 'handlebars')

//Ruta raíz
app.get('/', (req, res) => {
    res.render("dashboard", {
        productos: ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"],
        arrayCompra,
    })
})

//Ruta para agregar al carro de compras
app.post('/agregar', (req, res) => {
    const { id } = req.body
    arrayCompra.push(id)
    res.send(`Producto (${id}) agregado, actualice la web`)
})

//Ruta para eliminar un producto del carro
app.delete('/eliminar', (req, res) => {
    const { id } = req.body

    index = arrayCompra.indexOf(id)
    producto = arrayCompra.splice(index, 1)

    res.send(`Producto (${producto}) eliminado, actualice la web`)
})