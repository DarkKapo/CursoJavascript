import Animal from './animal.js'
import {Leon, Lobo, Oso, Serpiente, Aguila } from './animales.js'

//Boton para registrar
const btnR = document.getElementById('btnRegistrar')
//extraer los datos
var nomAnimal = document.getElementById('animal')
var edadAnimal = document.getElementById('edad')
var comentarioAnimal = document.getElementById('comentarios')

//Array para guardar varios animales
const arrayAnimales = []

//Hacer consulta async/await para obtener la imagen
const getImagen = async (num) => {
    const url = './animales.json'
    try {
        const response = await fetch(url)
        const photo = await response.json()
        return photo.animales[num].imagen
    } catch (error) {
        console.log(error);
    }
}
//Hacer consulta async/await para obtener el sonido
const getSonido = async (nom) => {
    const url = './animales.json'
    try {
        const response = await fetch(url)
        const animales = await response.json()
        let sonido = '' //valor para retornar el nombre del sonido del animal
        animales.animales.forEach(animal => {
            if(animal.name == nom)
            {
                sonido = animal.sonido
            }
        })
        return sonido
    } catch (error) {
        console.log(error);
    }
}

//Función que valida los datos
let validar = () => {
    if (nomAnimal.value == "Seleccione un animal") { //Valida el campo tipo de animal
        console.log(nomAnimal.value);
        return false
    }
    if (edadAnimal.value == "Seleccione un rango de años") { //Valida campo edad del animal
        console.log(edadAnimal.value);
        return false
    }
    if (comentarioAnimal.value === "") { //valida que exista un comentario
        console.log(comentarioAnimal.value);
        return false
    }
    return true
}
//Agrega funcionalidad al boton "agregar"
btnR.addEventListener("click", async () => {   
    if (validar()) {
        let nuevoAnimal

        //Instanciar un animal dependiendo la selección y usando los datos del formulario
        if (nomAnimal.value == "Leon") {
            const stringImg = await getImagen(0)
            nuevoAnimal = new Leon(nomAnimal.value, edadAnimal.value, stringImg, comentarioAnimal.value, 'animales[0].sonido')
        }
        if (nomAnimal.value == "Lobo") {
            const stringImg = await getImagen(1)
            nuevoAnimal = new Lobo(nomAnimal.value, edadAnimal.value, stringImg, comentarioAnimal.value, 'animales[0].sonido')
        }
        if (nomAnimal.value == "Oso") {
            const stringImg = await getImagen(2)
            nuevoAnimal = new Oso(nomAnimal.value, edadAnimal.value, stringImg, comentarioAnimal.value, 'animales[0].sonido')
        }
        if (nomAnimal.value == "Serpiente") {
            const stringImg = await getImagen(3)
            nuevoAnimal = new Serpiente(nomAnimal.value, edadAnimal.value, stringImg, comentarioAnimal.value, 'animales[0].sonido')
        }
        if (nomAnimal.value == "Aguila") {
            const stringImg = await getImagen(4)
            nuevoAnimal = new Aguila(nomAnimal.value, edadAnimal.value, stringImg, comentarioAnimal.value, 'animales[0].sonido')
        }

        arrayAnimales.push(nuevoAnimal)
        mostrarAnimal()
    }else{
        alert("Error en la validación, llene los campos")
    }

    //Devolver el formulario al estado inicial
    document.getElementById('animal').value = 'Seleccione un animal'
    document.getElementById('edad').value = 'Seleccione un rango de años'
    document.getElementById('comentarios').value = ''
    document.querySelector("#preview").src=`/assets/imgs/lion.svg`
})
//Función que muestra un modal
const mostrarModal = (nombre, edad, img, comentarios) => {
    //Extraer elemento para agregar el modal
    let templateModal = document.getElementById('modalAnimal')

    templateModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered w-25" role="document">
        <div class="modal-content bg-dark">
            <div class="modal-body">
                <img src="/assets/imgs/${img}" class="card-img-top" alt="..." ">
                <hr class="w-50 mx-auto">
                <p>Edad: ${edad}</p>
                <p>Comentario:</p>
                <p><span class="text-outline-primary">${comentarios}</span></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>`
}

//Función para mostrar animales, crea una "card" con los datos
const mostrarAnimal = () => {
    const templateAnimal = document.getElementById('Animales')
    //limpiar el template por seguridad
    templateAnimal.innerHTML = ""
    arrayAnimales.forEach((animal) => {
        templateAnimal.innerHTML += `
        <div class="col" data-fighter='${animal.nombre}'>
            <div class="card">
            <img src="/assets/imgs/${animal.img}" class="card-img-top" data-toggle="modal" data-target="#modalAnimal" onclick="${mostrarModal(animal.nombre, animal.edad, animal.img, animal.comentarios)}" alt="..." ">
            <div class="card-body">
                <button class="btn btn-outline-danger" data-button='${animal.nombre}'>Sonido</button>
            </div>
            </div>
        </div>`
    })

    //Agregar funcionalidad al boton sonido
    const botones = document.querySelectorAll("[data-button]");
    botones.forEach((boton) => {
        boton.addEventListener("click", (w) => {
            let nom = w.target.dataset.button
            activarSonido(nom)
    });
  });
}
//Función que usa un IIFE, para reproducir el sonido del animal
const activarSonido = (nombre) => {
    const funcionIIFE = (() => {
        //Sector privado, va a llamar y reproducir el sonido de un animal
        let reproducirSonido

        reproducirSonido = async (nom) => {
            var sonido = await getSonido(nom)
            const music = new Audio(`/assets/sounds/${sonido}`)
            music.play()
        }

        return{
            //parte pública, va a llamar a la función privada
            llamarSonido: (nombre) =>{
                reproducirSonido(nombre)
            }
        }
    })();
    funcionIIFE.llamarSonido(nombre)
}