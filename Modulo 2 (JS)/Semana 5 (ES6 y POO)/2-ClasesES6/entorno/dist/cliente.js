"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

//Crea clase cliente y exportar
var Cliente = /*#__PURE__*/function () {
  function Cliente(nombre, impuestos) {
    _classCallCheck(this, Cliente);

    this._nombre = nombre;
    this._impuestos = impuestos;
  } //Crea get y set para nombre


  _createClass(Cliente, [{
    key: "nombre",
    get: function get() {
      return this._nombre;
    },
    set: function set(nombre) {
      this._nombre = nombre;
    } //Calcula el impuesto al cliente

  }, {
    key: "calcularImpuesto",
    value: function calcularImpuesto() {
      return (this._impuestos.monto_bruto_anual - this._impuestos.deducciones) * 0.21;
    }
  }]);

  return Cliente;
}();

exports["default"] = Cliente;