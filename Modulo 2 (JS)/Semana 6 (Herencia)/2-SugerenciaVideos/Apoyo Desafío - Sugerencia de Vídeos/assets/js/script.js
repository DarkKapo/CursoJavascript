//Clase padre
class Multimedia {
    constructor(url)
    {
        let _url = url
        //Agregar get con closure
        this.getUrl = () => _url
    }

    get url()
    {
        return this.getUrl()
    }

    setInicio()
    {
        return `Este método es para realizar un cambio en la URL del video`
    }
}

class Reproductor extends Multimedia{
    constructor(url, id)
    {
        super(url)
        this._id = id
    }

    playMultimedia()
    {
        //Llamar a la función pública IIFE, enviando url y id
        moduloPrueba.miFuncionPublica(this.getUrl(), this._id)
    }
    //Inicia un video desde tiempo en segundos
    setInicio(tiempo)
    {
        let newUrl =`${this.getUrl()}?start=${tiempo}`
        moduloPrueba.miFuncionPublica(newUrl, this._id)
    }
}
//Patron IIFE
const moduloPrueba = (() => {
    //Función privada que muestra un video
    miMetodoPrivado = (url, id) => {
        document.getElementById(id).src = url
    };

    return{
        //Funcion pública que llama a la función privada
        miFuncionPublica: (url, id) => {
            miMetodoPrivado(url, id)
        }
    };
})()

//link musica
m1 = new Multimedia("https://www.youtube.com/embed/vEFBj3mlnt4")
//link pelicula
m2 = new Multimedia("https://www.youtube.com/embed/5PSNL1qE6VY")
//link serie
m3 = new Multimedia("https://www.youtube.com/embed/62jVLZ4JfjM")
//console.log(m1.url);

//Extraer datos de los botones
let btnM = document.getElementById('musica')
let btnP = document.getElementById('peliculas')
let btnS = document.getElementById('series')

//Invocar 2 veces a playMultimedia y 1 vez setInicio de la clase hija
r1 = new Reproductor(m1.url, btnM.id)
//r1.playMultimedia()
r1.setInicio(75)

r2 = new Reproductor(m2.url, btnP.id)
r2.playMultimedia()

r3 = new Reproductor(m3.url, btnS.id)
r3.playMultimedia()
//Probando setInicio de clase padre
console.log(m1.setInicio());