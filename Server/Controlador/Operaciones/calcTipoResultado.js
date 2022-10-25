const TIPO_DATO = require("../Tipos/TipoDato");
const TIPO_OPERACION = require("../Tipos/TipoOperacion");
const TIPO_VALOR = require("../Tipos/TipoValor");

function calcTipoResultado(_tipo1, _tipo2, tipoIns){
    if (tipoIns === TIPO_OPERACION.SUMA || tipoIns === TIPO_OPERACION.RESTA ||
        tipoIns === TIPO_OPERACION.MULTIPLICACION || tipoIns === TIPO_OPERACION.DIVISION ||
        tipoIns === TIPO_OPERACION.POTENCIA || tipoIns === TIPO_OPERACION.MODULO ||
        tipoIns === TIPO_OPERACION.UMENOS) {

        if  (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO) {
            return TIPO_DATO.ENTERO
        } else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL) {
            return TIPO_DATO.DECIMAL
        } else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.BANDERA) {
            switch(tipoIns) {
                case TIPO_OPERACION.MULTIPLICACION:
                case TIPO_OPERACION.DIVISION:
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.ENTERO
        } else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CARACTER) {
            switch(tipoIns) {
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.ENTERO
        } else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CARACTER) {
            switch(tipoIns) {
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.CADENA
        } else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO) {
            return TIPO_DATO.DECIMAL
        } else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL) {
            return TIPO_DATO.DECIMAL
        } else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.BANDERA) {
            switch(tipoIns) {
                case TIPO_OPERACION.MULTIPLICACION:
                case TIPO_OPERACION.DIVISION:
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.DECIMAL
        } else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CARACTER) {
            switch(tipoIns) {
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.DECIMAL
        } else if (_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.ENTERO) {                
            switch(tipoIns) {
                case TIPO_OPERACION.MULTIPLICACION:
                case TIPO_OPERACION.DIVISION:
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.ENTERO
        } else if (_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.DECIMAL) {
            switch(tipoIns) {
                case TIPO_OPERACION.MULTIPLICACION:
                case TIPO_OPERACION.DIVISION:
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.DECIMAL
        } else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.ENTERO) {
            switch(tipoIns) {
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.ENTERO
        } else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DECIMAL) {
            switch(tipoIns) {
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.DECIMAL
        }else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CARACTER) {
            switch(tipoIns) {
                case TIPO_OPERACION.RESTA:
                case TIPO_OPERACION.MULTIPLICACION:
                case TIPO_OPERACION.DIVISION:
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.CADENA
        } else if (_tipo1 === TIPO_DATO.CADENA || _tipo2 === TIPO_DATO.CADENA) {
            switch(tipoIns) {
                case TIPO_OPERACION.RESTA:
                case TIPO_OPERACION.MULTIPLICACION:
                case TIPO_OPERACION.DIVISION:
                case TIPO_OPERACION.POTENCIA:
                case TIPO_OPERACION.MODULO:
                case TIPO_OPERACION.UMENOS:
                    return null
            }
            return TIPO_DATO.CADENA
        } 
    }
    return null
}

module.exports = calcTipoResultado