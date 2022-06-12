const express = require('express')
const joyas = require('./data/joyas.js')
const app = express()
app.listen(3000, () => console.log('Your app listening on port 3000'))

//disponibilizar carpeta data
app.use(express.static('data'))

app.get('/', (req, res) => {
  res.send(joyas)
})

//Uso de HATEOAS (Requerimiento 1)
const HATEOASV1 = () =>
  //Map para seleccionar los atributos a mostrar
  joyas.results.map((joya) => {
    return {
      name: joya.name,
      metal: joya.metal,
      href: `http://localhost:3000/joyas/${joya.id}`,
    }
})

//Ruta get para obtener las joyas del map (Requerimiento 1)
app.get('/api/v1/joyas', (req, res) => {
  res.send({
    joyas: HATEOASV1(),
  })
})

//Funcion que obtiene la descripcion de 1 joya (Requerimiento 1)
const joya = (id) => {
  return joyas.results.find( (joyaID) => joyaID.id == id )
}

//Ruta con el detalle de cada joya (Requerimiento 1)
app.get('/joyas/:id', (req, res) => {
  const id = req.params.id
  res.send(joya(id))
})

//Version 2 (Requerimiento 2)
const HATEOASV2 = () =>
  joyas.results.map( (joya) => {
    return {
      name: joya.name,
      material: joya.metal,
      src: `http://localhost:3000/joyas/${joya.id}`,
    }
})

//Ruta con la version 2 (Requerimiento 2)
app.get('/api/v2/joyas', (req, res) => {
  //Extraer la query para ordenar asc o desc (Requerimiento 7)
  const { values } = req.query

  //If para ordenar asc o desc (Requerimiento 7)
  if(values == "asc") return res.send(orderValues("asc"))
  if(values == "desc") return res.send(orderValues("desc"))

  //if para verificar si hay paginacion(Requerimiento 6)
  if(req.query.page)
  {
    const { page } = req.query
    //Uso de la formula para paginar
    return res.send({ joyas: HATEOASV2().slice(page * 3 - 3, page * 3)})
  }

  res.send({
    joyas: HATEOASV2(),
  })
})

//Funcion que recibe una categoria para luego filtrar (Requerimiento 3)
const filterByCategory = (category) => {
  return joyas.results.filter( (joyaFiltro) => joyaFiltro.category === category)
}

//Ruta que filtra por categoria (Requerimiento 3)
app.get('/api/v2/category/:category', (req, res) => {
  const category = req.params.category
  res.send({
    cantidad: filterByCategory(category).length,
    joyas: filterByCategory(category),
  })
})

//Funcion para filtrar por campos, se necesita el campo y la joya (Requerimiento 4)
const fieldsSelect = (joya, fields) => {
  for (atributo in joya)
  {
    if(!fields.includes(atributo))
      delete joya[atributo]
  }
  return joya
}

//Ruta para filtrar por campos (Requerimiento 4)
app.get('/api/v2/joya/:id', (req, res) => {
  //Obtener el id de la joya y los atributos
  const { id } = req.params
  const { fields } = req.query

  //Retonar la joya con los campos filtrados
  if (fields)
    return res.send({ joya: fieldsSelect(joya(id), fields.split(','))})
  
  //Mensaje de error si no existe la guitarra (Requerimiento 5)
  joya(id) ? res.send({ joya: joya(id),}) : res.status(404).send({ error: "404 no encontrado", message: "No existe la joya"})

  res.send({
    joya: joya(id),
  })
})

//Funcion para ordenar asc o desc (Requerimiento 7)
const orderValues = (order) => {
  return order =="asc" ? joyas.results.sort((a, b) => (a.value > b.value ? 1 : -1))
          : order == "desc" ? joyas.results.sort((a, b) => (a.value < b.value ? 1 : -1))
          : false
}