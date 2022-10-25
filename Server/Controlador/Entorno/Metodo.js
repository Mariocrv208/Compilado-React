const TIPO_SIMBOLO = require("../Tipos/TipoSimbolo")

class Metodo{
    constructor(_tipoRetorno, _nombre, _listaParams, _listaIns, _linea, _columna) {
        this.tipoSimbolo = TIPO_SIMBOLO.FUNCION
        this.tipoRetorno = _tipoRetorno
        this.nombre = _nombre
        this.listaParams = _listaParams
        this.listaIns = _listaIns
        this.linea = _linea
        this.columna = _columna
    }
}

module.exports = Metodo