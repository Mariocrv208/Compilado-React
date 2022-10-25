const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")

const getSimboloValorReal = (operador, tipResOperacion) => {
    let valorReal
    switch (tipResOperacion) { 
        case TIPO_DATO.ENTERO:
            switch (operador.tipo) {
                case TIPO_DATO.ENTERO:
                    valorReal = parseInt(operador.valor)
                    break
                case TIPO_DATO.DECIMAL:
                    valorReal = parseFloat(operador.valor)
                    break;
                case TIPO_DATO.BANDERA:
                    valorReal = (operador.valor === true)? 1 : 0
                    break;
                case TIPO_DATO.CARACTER:
                    valorReal  = operador.valor.charCodeAt(0)
                    break;
                case TIPO_DATO.CADENA:
                    valorReal = operador.valor
                    break;
            }
            break;
        
        case TIPO_DATO.DECIMAL:
            switch (operador.tipo) {
                case TIPO_DATO.ENTERO:
                    valorReal = parseInt(operador.valor)
                    break
                case TIPO_DATO.DECIMAL:
                    valorReal = parseFloat(operador.valor)
                    break;
                case TIPO_DATO.BANDERA:
                    valorReal = (operador.valor === true)? 1 : 0
                    break;
                case TIPO_DATO.CARACTER:
                    valorReal  = operador.valor.charCodeAt(0)
                    break;
                case TIPO_DATO.CADENA:
                    valorReal = operador.valor
                    break;
            }
            break;   

        case TIPO_DATO.BANDERA:
            switch (operador.tipo) {
                case TIPO_DATO.ENTERO:
                    valorReal = parseInt(operador.valor)
                    break
                case TIPO_DATO.DECIMAL:
                    valorReal = parseFloat(operador.valor)
                    break;
                case TIPO_DATO.BANDERA:
                    valorReal = (operador.valor === true)? 1 : 0
                    break;
                case TIPO_DATO.CARACTER:
                    valorReal  = operador.valor.charCodeAt(0)
                    break;
                case TIPO_DATO.CADENA:
                    valorReal = operador.valor
                    break;
            }
            break;   

        case TIPO_DATO.CARACTER:
            switch (operador.tipo) {
                case TIPO_DATO.ENTERO:
                    valorReal = parseInt(operador.valor)
                    break
                case TIPO_DATO.DECIMAL:
                    valorReal = parseFloat(operador.valor)
                    break;
                case TIPO_DATO.BANDERA:
                    valorReal = (operador.valor === true)? 1 : 0
                    break;
                case TIPO_DATO.CARACTER:
                    valorReal  = operador.valor.charCodeAt(0)
                    break;
                case TIPO_DATO.CADENA:
                    valorReal = operador.valor
                    break;
            }
            break; 
        
        case TIPO_DATO.CADENA:
            switch (operador.tipo) {
                case TIPO_DATO.ENTERO:
                    valorReal = parseInt(operador.valor)
                    break
                case TIPO_DATO.DECIMAL:
                    valorReal = parseFloat(operador.valor)
                    break;
                case TIPO_DATO.BANDERA:
                    valorReal = String(operador.valor)
                    break;
                case TIPO_DATO.CARACTER:
                    valorReal = String(operador.valor)
                    break;
                case TIPO_DATO.CADENA:
                    valorReal = operador.valor
                    break;
            }
            break; 
   

    }
    return valorReal
}

module.exports = getSimboloValorReal