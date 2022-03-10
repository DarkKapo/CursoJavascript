import Animal from './animal.js'
//Crea una clase por cada animal siguiendo el modelo UML
export class Leon extends Animal{
    constructor(nombre, edad, img, comentarios, sonido)
    {
        super(nombre, edad, img, comentarios, sonido)
    }

    rugir()
    {
        console.log('sonido Leon');
    }
}

export class Lobo extends Animal{
    constructor(nombre, edad, img, comentarios, sonido)
    {
        super(nombre, edad, img, comentarios, sonido)
    }

    Aullar()
    {
        console.log('sonido Lobo');
    }
}

export class Oso extends Animal{
    constructor(nombre, edad, img, comentarios, sonido)
    {
        super(nombre, edad, img, comentarios, sonido)
    }

    gruñir()
    {
        console.log('sonido Oso');
    }
}

export class Serpiente extends Animal{
    constructor(nombre, edad, img, comentarios, sonido)
    {
        super(nombre, edad, img, comentarios, sonido)
    }

    sisear()
    {
        console.log('sonido Sepiente');
    }
}

export class Aguila extends Animal{
    constructor(nombre, edad, img, comentarios, sonido)
    {
        super(nombre, edad, img, comentarios, sonido)
    }

    chillar()
    {
        console.log('sonido Aguila');
    }
}