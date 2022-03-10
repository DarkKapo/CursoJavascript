//extraer el valor de "nombre del animal"
const animalSeleccionado = document.querySelector("#animal")
//Tomar el preview para agregar la imagen
var preview = document.querySelector("#preview").src=`/assets/imgs/lion.svg`

//Hace una consulta async/await y agrega la imagen
const getImagen = async () => {
  const url = './animales.json'
  try {
      const response = await fetch(url)
      const photo = await response.json()

      photo.animales.forEach(animal => {
        if (animal.name == animalSeleccionado.value) {
          document.querySelector("#preview").src=`/assets/imgs/${animal.imagen}` //Cambia la imagen
          return true //return para devolver algún valor
        }
      });
  } catch (error) {
      console.log(error)
  }
}
//al hacer clic en algún animal de la lista, cambia la imagen
animalSeleccionado.addEventListener('click', getImagen)