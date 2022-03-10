//Get datos es una promesa
const getDatos = async () => {
    const url = "https://jsonplaceholder.typicode.com/photos"

    try {
        //fecth para consultar la url
        const response = await fetch(url)
        const datos = await response.json()
        console.log(datos);
        //for each para mostrar 20 resultados
        datos.forEach(dato => {
            if(dato.id < 20)
            console.log(dato.title);
        });
    } catch (error) {
        console.log(error);
    }
}
//Enviar un mensaje después de 3 seg
const enviaMensaje = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Información enviada")
        }, 3000);
    })
}
//obtiene el mensaje
const getMensaje = async () => {
    const mensaje = await enviaMensaje()
    console.log(mensaje);
}

getDatos()
getMensaje()