const analizarOperacion = require("../Operaciones/analizarOperacion");
const TIPO_DATO = require("../Tipos/TipoDato");

function Asignacion(instruccion, ambito){
    if (ambito.existeSimbolo(instruccion.id)) {
        var valor = analizarOperacion(instruccion.expresion, ambito)
        var simbolo = ambito.getSimbolo(instruccion.id)
        if (simbolo.tipo === valor.tipo || (simbolo.tipo === TIPO_DATO.DECIMAL && valor.tipo === TIPO_DATO.ENTERO)) { 
            simbolo.valor = valor.valor
            ambito.actualizar(instruccion.id, simbolo)
            return null
        }
        return "Error: No es posible asignar un valor de tipo " + valor.tipo + " a la variable \n'"+ instruccion.id +"' que es de tipo " + simbolo.tipo + "... Linea: "+instruccion.linea+" Columna: "+ instruccion.columna;
    }
    return `Error: la variable '${String(instruccion.id)}' no existe... Linea: ${instruccion.linea} Columna: ${instruccion.columna}`
}

module.exports = Asignacion