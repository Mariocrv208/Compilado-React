const procesarCadena = require("../Operaciones/procesarCadena")

function Print(_instruccion, _ambito) {
    return procesarCadena(_instruccion.expresion, _ambito).valor
}

module.exports = Print