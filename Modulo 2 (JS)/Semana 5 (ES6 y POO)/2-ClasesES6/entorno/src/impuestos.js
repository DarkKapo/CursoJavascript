//Crea clase impuesto y la exporta
export default class Impuestos {
    constructor(monto_bruto_anual, deducciones)
    {
        this._monto_bruto_anual = monto_bruto_anual
        this._deducciones = deducciones
    }
    //Crea get y set para cada variable
    get monto_bruto_anual()
    {
        return this._monto_bruto_anual
    }

    set monto_bruto_anual(monto)
    {
        this._monto_bruto_anual = monto
    }

    get deducciones()
    {
        return this._deducciones
    }

    set deducciones(deduccion)
    {
        this._deducciones = deduccion
    }
}