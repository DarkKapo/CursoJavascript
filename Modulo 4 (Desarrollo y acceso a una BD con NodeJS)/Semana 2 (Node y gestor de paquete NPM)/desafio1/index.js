//cambiar a express
const http = require('http')
//axios
const axion = require('axios')
const { default: axios } = require('axios')
//UUID
const { v4:uuidV4 } = require('uuid')
//Moment
const moment = require('moment')
//lodash
const _ = require('lodash')
//chalk
const chalk = require('chalk')

//arreglo para guardar los usuarios y genero
let arr_usuario = []
let arr = []
let arr_genders = []
//Paso 1
http.createServer( (req, res) =>{
    //Disponibilizar ruta
    if (req.url.startsWith('/usuarios')) {
        res.writeHead(200, { 'Content-type': 'text/html' })
        axios.get('https://randomuser.me/api').then(function (datos){
            //Guardar datos requeridos
            const { first, last } = datos.data.results[0].name
            const gender = datos.data.results[0].gender
            const id = uuidV4().slice(0,6)
            const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')

            //Guarda los datos del usuario
            arr_usuario.push({first, last, id, timestamp, gender})
            arr.push({first, last, id, timestamp, gender})

            //Guarda el genero en un arreglo independiente
            arr_genders.push(gender)
            
            //generar lista ordenada que se muestra en el navegador
            res.write('<ol>')
            _.forEach(arr_usuario, (usuario) => {
                res.write(`<li>Nombre: ${usuario.first} - Apellido ${usuario.last} - id: ${usuario.id} - timestamp: ${usuario.timestamp} - gender: ${usuario.gender}</li>`) 
            })
            //genera el texto que se muestra en consola con los colores requeridos
            _.forEach(arr, (usuario) => {
                console.log(chalk.blue.bgWhite(`Nombre: ${usuario.first} - Apellido ${usuario.last} - id: ${usuario.id} - timestamp: ${usuario.timestamp}`)) 
            })

            //Muestra un arreglo dividido por sexo
            console.log(_.partition(arr_genders, (n) => n == 'female'))

            arr.pop()
            res.write('</ol>')
            res.end()
        }).catch()
    }
} ).listen(3000, () => {
    console.log('Servidor en puerto 3000')
})