const express = require('express');
const { join } = require('path');
const app = express();
const path = require("path");

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});

//Crear numero aleatorio
let numAleatorio = () => {
    return Math.floor(Math.random() *4)+1;
}

let numA = numAleatorio();

//Dejamos la carpeta pública
app.use(express.static(path.join(__dirname + "/assets")));

const nombres = ["Catalina", "Rodrigo", "Valentina", "Eduardo", "Javiera", "Alfredo"];

app.get("/abracadabra/usuarios", (req, res) => {
    res.send({nombres});
});
//Uso del middleware para validar la ruta
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    nombres.includes(usuario) ? next() : res.redirect("/who.jpeg");
});

//Se usa app.get para crear las rutas
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get('/abracadabra/conejo/:n', function(req, res) {
    const num = req.params.n;

    if (num == numA) {
        res.redirect("/conejito.jpg");
        numA = numAleatorio();
    }else{
        res.redirect("/voldemort.jpg");
    }
});

app.get("*", (req, res) => {
    res.status(404);
    res.send("Error");
})