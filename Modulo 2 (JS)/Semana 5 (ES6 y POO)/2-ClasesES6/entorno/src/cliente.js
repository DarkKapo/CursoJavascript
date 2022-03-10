//Crea clase cliente y exportar
export default class Cliente {
    constructor(nombre, impuestos)
    {
        this._nombre = nombre
        this._impuestos = impuestos
    }
    //Crea get y set para nombre
    get nombre()
    {
        return this._nombre
    }

    set nombre(nombre)
    {
        this._nombre = nombre
    }

    //Calcula el impuesto al cliente
    calcularImpuesto()
    {
        return ((this._impuestos.monto_bruto_anual - this._impuestos.deducciones)*0.21)
    }
}