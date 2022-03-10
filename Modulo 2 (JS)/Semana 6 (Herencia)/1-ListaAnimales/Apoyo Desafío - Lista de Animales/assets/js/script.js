//Clase Propietario
class Propietario {
    constructor(nombre, direccion, telefono)
    {
        this._nombre = nombre
        this._direccion = direccion
        this._telefono = telefono
    }
    //Método que retorna los datos del propietario
    datosPropietario()
    {
        return `El nombre del dueño es: ${this._nombre}. Dirección: ${this._direccion} y su Teléfono es: ${this._telefono}`
    }
}

//Clase Animal que hereda de Propietario
class Animal extends Propietario {
    constructor(nombre, direccion, telefono, tipo)
    {
        super(nombre, direccion, telefono)
        this._tipo = tipo
    }
    //Función get
    get tipo ()
    {
        return `El tipo de animal es ${this._tipo}`
    }
}

//Clase Mascota que hereda de Animal
class Mascota extends Animal {
    constructor(nombre, direccion, telefono, tipo, nombreM, enfermedad)
    {
        super(nombre, direccion, telefono, tipo)
        this._nombreM = nombreM
        this._enfermedad = enfermedad
    }
    //Get y Set nombre Mascota
    get nombreM()
    {
        return this._nombreM
    }

    set nombreM(nombreM)
    {
        this._nombreM = nombreM
    }

    //Get y Set enfermedad
    get enfermedad()
    {
        return this._enfermedad
    }

    set enfermedad(enfermedad)
    {
        this._enfermedad = enfermedad
    }
}

//Obtener el boton
let registrar = document.getElementsByClassName("btn btn-primary")

//Activar Evento al hacer clic
registrar[0].addEventListener('click', observando)

//Funcion registrando
function registrando() {
    //Captura los datos y los guarda
    let nombre = document.getElementById('propietario').value
    let direccion = document.getElementById('direccion').value
    let telefono = document.getElementById('telefono').value
    let tipo = document.getElementById('tipo').value
    let nombreM = document.getElementById('nombreMascota').value
    let enfermedad = document.getElementById('enfermedad').value

    //Varios if que definen el nombre de la instancia Mascota
    if(tipo == "perro")
    {
        var perro = new Mascota(nombre, direccion, telefono, tipo, nombreM, enfermedad)
        return perro
    }

    if(tipo == "gato")
    {
        var gato = new Mascota(nombre, direccion, telefono, tipo, nombreM, enfermedad)
        return gato
    }

    if(tipo == "conejo")
    {
        var conejo = new Mascota(nombre, direccion, telefono, tipo, nombreM, enfermedad)
        return conejo
    }
}

//Función observando
function observando(e) {
    e.preventDefault()
    //Capturar los datos
    const datos = registrando()
    const nombreM = datos.nombreM
    const tipo = datos.tipo
    const enfermedad = datos.enfermedad
    //Obtener resultado para imprimir
    const resultado = document.getElementById('resultado')
    //Crea un elemento para mostrar los datos
    const mostrar = document.createElement('mostrar')
    mostrar.innerHTML = `<ul>${datos.datosPropietario()} </ul> <ul>${tipo}, mientras que el nombre de la mascota es: ${nombreM} y la enfermedad es ${enfermedad}</ul>`
    //Agregar mostrar como hijo
    resultado.appendChild(mostrar)
    //Limpiar datos
    document.getElementById('propietario').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('telefono').value = ''
    document.getElementById('tipo').value = ''
    document.getElementById('nombreMascota').value = ''
    document.getElementById('enfermedad').value = ''
}