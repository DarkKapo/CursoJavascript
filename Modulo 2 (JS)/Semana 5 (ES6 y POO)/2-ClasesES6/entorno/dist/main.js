"use strict";

var _cliente = _interopRequireDefault(require("./cliente.js"));

var _impuestos = _interopRequireDefault(require("./impuestos.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var i1 = new _impuestos["default"](2000, 1000); // console.log(i1.monto_bruto_anual);
// console.log(i1.deducciones);

var c1 = new _cliente["default"]('Valentina', i1); //console.log(c1._impuestos.deducciones);

console.log(c1.calcularImpuesto());