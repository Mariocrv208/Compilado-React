const analizarOperacion = require("./analizarOperacion")

function procesarCadena(_expresion, _ambito) {
    return analizarOperacion(_expresion, _ambito)
}

module.exports = procesarCadena