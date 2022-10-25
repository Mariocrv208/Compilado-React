const TIPO_SIMBOLO = require("../Tipos/TipoSimbolo")

class Simbolo {
    constructor(_id, _valor, _tipo, _linea, _columna) {
        this.tipoSimbolo = TIPO_SIMBOLO.DATO
        this.id = _id
        this.valor = _valor
        this.tipo = _tipo
        this.linea = _linea
        this.columna = _columna
    }
}

module.exports = Simbolo