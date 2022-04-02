//Importar chai
const chai = require('chai')
//Importar chai-http
const chaiHttp = require('chai-http')
//Importar el servidor
const server = require('../index.js')

//Usar metodo use
chai.use(chaiHttp)

//Crear una suite de test y un test unitario con las descripciones correspondientes a la prueba de nuestra API REST
describe('Prueba a ruta /deportes', () => {
    it('Verificando si el archivo tiene un Array', () => {
        chai.request(server).get('/deportes').end( (err, res) => {
            let data = JSON.parse(res.text)
            //property: propiedad que se espera
            chai.expect(data).to.have.property('deportes')
            //n: se espera que el dato sea array
            chai.expect(data.deportes).to.be.an('array')
        })
    })
})