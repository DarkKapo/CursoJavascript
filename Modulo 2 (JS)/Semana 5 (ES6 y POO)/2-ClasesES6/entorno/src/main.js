import Cliente from './cliente.js'
import Impuestos from './impuestos.js'

let i1 = new Impuestos(2000, 1000)
// console.log(i1.monto_bruto_anual);
// console.log(i1.deducciones);

let c1 = new Cliente('Valentina', i1)
//console.log(c1._impuestos.deducciones);

console.log(c1.calcularImpuesto());