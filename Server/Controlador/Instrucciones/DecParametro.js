module.exports = DecParametro
const Simbolo = require("../Entorno/Simbolo");
const TIPO_DATO = require("../Tipos/TipoDato");
const analizarOperacion = require("../Operaciones/analizarOperacion");

function DecParametro(instruccion, ambito) {
    if(instruccion.tipo_dato === TIPO_DATO.DECIMAL){
        if(instruccion.valor != null){
            var op = analizarOperacion(instruccion.valor, ambito)
            if(op.tipo === TIPO_DATO.DECIMAL || op.tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
            }
            else {
                return "Error: No es posible asignar un valor de tipo: " + op.tipo + " a la variable: "+ instruccion.id +", que es de tipo: "+ TIPO_DATO.DECIMAL + ", Linea: " + instruccion.linea + " Columna: " + instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(instruccion.id, valor, TIPO_DATO.DECIMAL, instruccion.linea, instruccion.columna)
        if(ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            return "Error: La variable: "+ nuevoSimbolo.id +", ya existe, Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (instruccion.tipo_dato === TIPO_DATO.ENTERO) {
        var valor = 0
        if(instruccion.valor != null){
            var op = analizarOperacion(instruccion.valor, ambito)
            if(op.tipo === TIPO_DATO.ENTERO){
                valor = op.valor;
            }
            else {
                return "Error: No es posible asignar un valor de tipo: " + op.tipo + " a la variable: "+ instruccion.id +", que es de tipo: "+ TIPO_DATO.ENTERO + ", Linea: " + instruccion.linea + " Columna: " + instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(instruccion.id, valor, TIPO_DATO.ENTERO, instruccion.linea, instruccion.columna)
        if(ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            return "Error: La variable: "+ nuevoSimbolo.id +", ya existe, Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (instruccion.tipo_dato === TIPO_DATO.BANDERA) {
        var valor = false
        if(instruccion.valor != null){
            var op = analizarOperacion(instruccion.valor, ambito)
            if(op.tipo === TIPO_DATO.BANDERA){
                valor = op.valor;
            }
            else {
                return "Error: No es posible asignar un valor de tipo: " + op.tipo + " a la variable: "+ instruccion.id +", que es de tipo: "+ TIPO_DATO.BANDERA + ", Linea: " + instruccion.linea + " Columna: " + instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(instruccion.id, valor, TIPO_DATO.BANDERA, instruccion.linea, instruccion.columna)
        if(ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            return "Error: La variable: "+ nuevoSimbolo.id +", ya existe, Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (instruccion.tipo_dato === TIPO_DATO.CARACTER) {
        var valor = ''
        if(instruccion.valor != null) {
            var op = analizarOperacion(instruccion.valor, ambito)
            if(op.tipo === TIPO_DATO.CARACTER){
                valor = op.valor;
            }
            else {
                return "Error: No es posible asignar un valor de tipo: " + op.tipo + " a la variable: "+ instruccion.id +", que es de tipo: "+ TIPO_DATO.CARACTER + ", Linea: " + instruccion.linea + " Columna: " + instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(instruccion.id, valor, TIPO_DATO.CARACTER, instruccion.linea, instruccion.columna)
        if(ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            return "Error: La variable: "+ nuevoSimbolo.id +", ya existe, Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (instruccion.tipo_dato === TIPO_DATO.CADENA) {
        var valor = ""
        if(instruccion.valor != null){
            var op = analizarOperacion(instruccion.valor, ambito)
            if(op.tipo === TIPO_DATO.CADENA){
                valor = op.valor;
            }
            else {
                return "Error: No es posible asignar un valor de tipo: " + op.tipo + " a la variable: "+ instruccion.id +", que es de tipo: "+ TIPO_DATO.CADENA + ", Linea: " + instruccion.linea + " Columna: " + instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(instruccion.id, valor, TIPO_DATO.CADENA, instruccion.linea, instruccion.columna)
        if(ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            return "Error: La variable: "+ nuevoSimbolo.id +", ya existe, Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
}
