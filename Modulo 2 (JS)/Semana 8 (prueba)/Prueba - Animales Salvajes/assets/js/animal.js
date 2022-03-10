//Clase padre animal, Se usará closure dentro del constructor para la protección de datos
export default class Animal {
    constructor(nombre, edad, img, comentarios, sonido)
    {
        let _nombre = nombre
        //Agregar Get y/o Set del Closure
        this.getNombre = () => _nombre
        
        //El resto de las variables siguen la misma estructura de protección
        let _edad = edad
        this.getEdad = () => _edad

        let _img = img
        this.getImg = () => _img

        let _comentarios = comentarios
        this.getComentarios = () => _comentarios
        this.setComentarios = (comentario) => _comentarios = comentario

        let _sonido = sonido
        this.getSonido = () => _sonido
    }

    //Agregar métodos get y/o set para asegurar la privacidad
    get nombre()
    {
        return this.getNombre()
    }

    //El resto de las variables siguen la misma estructura de protección
    get edad()
    {
        return this.getEdad()
    }

    get img()
    {
        return this.getImg()
    }

    get comentarios()
    {
        return this.getComentarios()
    }

    set comentarios(comentario)
    {
        this.setComentarios(comentario)
    }

    get sonido()
    {
        return this.getSonido()
    }
}