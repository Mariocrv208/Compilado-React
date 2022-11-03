module.exports = analizarOperacion
const { NOIGUAL, INCREMENTO, DECREMENTO, CASTEO, LLAMADA_FUNC_METODO } = require("../Tipos/TipoOperacion");
const TIPO_OPERACION = require("../Tipos/TipoOperacion");
const TIPO_VALOR = require("../Tipos/TipoValor");
const getNodoDato = require("./getNodoDato");
const calcTipoResultado = require("./calcTipoResultado")
const getSimboloValorReal = require("./getSimboloValorReal");
const TIPO_DATO = require("../Tipos/TipoDato");
const ejecutarBloqueIns = require("../Instrucciones/ejecutarBloqueIns");
const  TIPO_FUNC_NATIVA = require("../Tipos/TipoFuncNativa")
let pila = require("../Instrucciones/pila")

function analizarOperacion(expresion, ambito) {
    if (expresion.tipo === TIPO_VALOR.DECIMAL || expresion.tipo === TIPO_VALOR.BANDERA ||
        expresion.tipo === TIPO_VALOR.CADENA || expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        expresion.tipo === TIPO_VALOR.ENTERO || expresion.tipo === TIPO_VALOR.CARACTER ||
        expresion.tipo === TIPO_VALOR.LISTA) {
        return getNodoDato(expresion, ambito)
    }
    else if (expresion.tipo === TIPO_OPERACION.SUMA || expresion.tipo === TIPO_OPERACION.RESTA ||
        expresion.tipo === TIPO_OPERACION.MULTIPLICACION || expresion.tipo === TIPO_OPERACION.DIVISION ||
        expresion.tipo === TIPO_OPERACION.POTENCIA ||  expresion.tipo === TIPO_OPERACION.MODULO ||
        expresion.tipo === TIPO_OPERACION.UMENOS) {
        return Aritmetica(expresion, ambito)
    }
    else if (expresion.tipo === TIPO_OPERACION.IGUALIGUAL || expresion.tipo ===  TIPO_OPERACION.NOIGUAL ||
        expresion.tipo === TIPO_OPERACION.MENOR || expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        expresion.tipo === TIPO_OPERACION.MAYOR || expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        return analizaExpRelacional(expresion, ambito)
    }
    else if (expresion.tipo === TIPO_OPERACION.OR || expresion.tipo === TIPO_OPERACION.AND ||
        expresion.tipo === TIPO_OPERACION.NOT) {
        return analizarExpLogica(expresion, ambito)
    }
    else if (expresion.tipo === TIPO_OPERACION.INCREMENTO) {
        return incremento(expresion, ambito)
    }
    else if (expresion.tipo === TIPO_OPERACION.DECREMENTO) {
        return decremento(expresion, ambito)
    } 
    else if (expresion.tipo === TIPO_OPERACION.CASTEO) {
        return casteo(expresion, ambito)
    }
    else if (expresion.tipo === TIPO_OPERACION.ACCESO_VECTOR) {
        return AccesoVector(expresion, ambito)
    }
    else if (expresion.tipo === TIPO_OPERACION.LLAMADA_FUNC_METODO) {
        return llamdaFuncMetodo(expresion, ambito)
    }

    else if (expresion.tipo === TIPO_OPERACION.ACCESO_LISTA) {
        return AccesoLista(expresion, ambito)
    }

    else if (expresion.tipo === TIPO_OPERACION.OPERADOR_TERNARIO) {
        return OperadorTernario(expresion, ambito)
    } 

    else if (expresion.tipo === TIPO_OPERACION.FUNC_NATIVA) {
        if (expresion.tipoFunc === TIPO_FUNC_NATIVA.FUNC_TO_LOWER) {
            return toLower(expresion, ambito)
        } else if (expresion.tipoFunc === TIPO_FUNC_NATIVA.FUNC_TO_UPPER) {
            return toUpper(expresion, ambito)
        } else if (expresion.tipoFunc === TIPO_FUNC_NATIVA.FUNC_LENGTH) {
            return Length(expresion, ambito)
        } else if (expresion.tipoFunc === TIPO_FUNC_NATIVA.FUNC_TRUNCATE) {
            return Truncate(expresion, ambito)
        } else if (expresion.tipoFunc === TIPO_FUNC_NATIVA.FUNC_ROUND) {
            return Round(expresion, ambito)
        } else if (expresion.tipoFunc === TIPO_FUNC_NATIVA.FUNC_TYPE_OF) {
            return TypeOf(expresion, ambito)
        } else if (expresion.tipoFunc === TIPO_FUNC_NATIVA.FUNC_TO_STRING) {
            return ToString(expresion, ambito)
        } else if (expresion.tipoFunc === TIPO_FUNC_NATIVA.FUNC_TO_CHAR_ARRAY) {
            return ToCharArray(expresion, ambito)
        }
    }
}

//_____________________________________Expresiones realcionles_________________________________

function analizaExpRelacional(expresion, ambito) {
    if (expresion.tipo === TIPO_OPERACION.IGUALIGUAL) {
        return igualIgual(expresion.opIzq, expresion.opDer, ambito)
    } else if (expresion.tipo === TIPO_OPERACION.NOIGUAL) {
        return noIgual(expresion.opIzq, expresion.opDer, ambito)
    } else if (expresion.tipo === TIPO_OPERACION.MENOR) {
        return menor(expresion.opIzq, expresion.opDer, ambito)
    } else if (expresion.tipo === TIPO_OPERACION.MENORIGUAL) {
        return menorIgual(expresion.opIzq, expresion.opDer, ambito)
    } else if (expresion.tipo === TIPO_OPERACION.MAYOR) {
        return mayor(expresion.opIzq, expresion.opDer, ambito)
    } else if (expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        return mayorIgual(expresion.opIzq, expresion.opDer, ambito)
    }
}

function igualIgual(_opIzq, _opDer, _ambito) {
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    if (validarTiposOperacionRelacional(opIzq.tipo, opDer.tipo, TIPO_OPERACION.IGUALIGUAL))  {
        const resultado = volorRealRelacional(opIzq) == volorRealRelacional(opDer)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion logica de Igualdad entre el tipo: ' + opIzq.tipo + ', y el tipo: ' + opDer.tipo + ', Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function noIgual(_opIzq, _opDer, _ambito) {
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    if (validarTiposOperacionRelacional(opIzq.tipo, opDer.tipo,  TIPO_OPERACION.NOIGUAL))  {
        const resultado = volorRealRelacional(opIzq) != volorRealRelacional(opDer)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion logica de No Igualdad entre el tipo: ' + opIzq.tipo + ', y el tipo: ' + opDer.tipo + ', Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function menor(_opIzq, _opDer, _ambito) {
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    if (validarTiposOperacionRelacional(opIzq.tipo, opDer.tipo, TIPO_OPERACION.MENOR))  {
        const resultado = volorRealRelacional(opIzq) < volorRealRelacional(opDer)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion logica de Menor Que entre el tipo: ' + opIzq.tipo + ', y el tipo: ' + opDer.tipo + ', Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function menorIgual(_opIzq, _opDer, _ambito) {
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    if (validarTiposOperacionRelacional(opIzq.tipo, opDer.tipo, TIPO_OPERACION.MENORIGUAL))  {
        const resultado = volorRealRelacional(opIzq) <= volorRealRelacional(opDer)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion logica de Menor Igual entre el tipo: ' + opIzq.tipo + ', y el tipo: ' + opDer.tipo + ', Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function mayor(_opIzq, _opDer, _ambito) {
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    if (validarTiposOperacionRelacional(opIzq.tipo, opDer.tipo,  TIPO_OPERACION.MAYOR))  {
        const resultado = volorRealRelacional(opIzq) > volorRealRelacional(opDer)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion logica de Mayor Que entre el tipo: ' + opIzq.tipo + ', y el tipo: ' + opDer.tipo + ', Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function mayorIgual(_opIzq, _opDer, _ambito) {
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    if (validarTiposOperacionRelacional(opIzq.tipo, opDer.tipo,  TIPO_OPERACION.MAYORIGUAL))  {
        const resultado = volorRealRelacional(opIzq) >= volorRealRelacional(opDer)
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion logica de Mayor Igual entre el tipo: ' + opIzq.tipo + ', y el tipo: ' + opDer.tipo + ', Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function volorRealRelacional(operador) {
    if (operador.tipo == TIPO_DATO.CARACTER) {
        return operador.valor.charCodeAt(0)
    }
    return operador.valor
}

function validarTiposOperacionRelacional(tipo1, tipo2, tipoOperacion) {
    if (tipo1 === TIPO_DATO.ENTERO && tipo2 === TIPO_DATO.ENTERO ||
        tipo1 === TIPO_DATO.ENTERO && tipo2 === TIPO_DATO.DECIMAL ||
        tipo1 === TIPO_DATO.ENTERO && tipo2 === TIPO_DATO.CARACTER ||
        tipo1 === TIPO_DATO.DECIMAL && tipo2 === TIPO_DATO.ENTERO ||
        tipo1 === TIPO_DATO.DECIMAL && tipo2 === TIPO_DATO.CARACTER ||
        tipo1 === TIPO_DATO.DECIMAL && tipo2 === TIPO_DATO.DECIMAL ||
        tipo1 === TIPO_DATO.CARACTER && tipo2 === TIPO_DATO.ENTERO ||
        tipo1 === TIPO_DATO.CARACTER && tipo2 === TIPO_DATO.DECIMAL ||
        tipo1 === TIPO_DATO.CARACTER && tipo2 === TIPO_DATO.CARACTER) {
        return true
    }
    if (tipoOperacion == TIPO_OPERACION.IGUALIGUAL || 
        tipoOperacion == TIPO_OPERACION.NOIGUAL) {
        if ((tipo1 === TIPO_DATO.CADENA && tipo2 === TIPO_DATO.CADENA)||
        (tipo1 === TIPO_DATO.ENTERO && tipo2 === TIPO_DATO.DECIMAL) ||
        (tipo1 === TIPO_DATO.ENTERO && tipo2 === TIPO_DATO.ENTERO) ||
        (tipo1 === TIPO_DATO.DECIMAL && tipo2 === TIPO_DATO.ENTERO) ||
        (tipo1 === TIPO_DATO.DECIMAL && tipo2 === TIPO_DATO.DECIMAL) ||
        (tipo1 === TIPO_DATO.BANDERA && tipo2 === TIPO_DATO.BANDERA) ||
        (tipo1 === TIPO_DATO.CARACTER && tipo2 === TIPO_DATO.CARACTER) ||
        (tipo1 === TIPO_DATO.CARACTER && tipo2 === TIPO_DATO.CADENA) ||
        (tipo1 === TIPO_DATO.CADENA && tipo2 === TIPO_DATO.CARACTER) ||
        (tipo1 === TIPO_DATO.CADENA && tipo2 === TIPO_DATO.CADENA)) {
            return true
        }
    }
    return false
}


//__________________________________Expresiones Aritmeticas__________________________________


function Aritmetica(_expresion, _ambito) {
    if(_expresion.tipo === TIPO_OPERACION.SUMA){
        return suma(_expresion.opIzq, _expresion.opDer, _expresion.tipo, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(_expresion.opIzq, _expresion.opDer, _expresion.tipo, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(_expresion.opIzq, _expresion.opDer, _expresion.tipo, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(_expresion.opIzq, _expresion.opDer, _expresion.tipo, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.POTENCIA){
        return potencia(_expresion.opIzq, _expresion.opDer, _expresion.tipo, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MODULO){
        return modulo(_expresion.opIzq, _expresion.opDer, _expresion.tipo, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.UMENOS){
        return umenos(_expresion.op, _expresion.tipo, _ambito)
    }
}

function suma(_opIzq, _opDer, _expTipo, _ambito) { 
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    const tipoRes = calcTipoResultado(opIzq.tipo, opDer.tipo, _expTipo)
    if (tipoRes != null) {
        const resultado = getSimboloValorReal(opIzq, tipoRes) + getSimboloValorReal(opDer, tipoRes)
        return{
            valor: resultado,
            tipo: tipoRes,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion Suma, con el tipo: ' + opIzq.tipo + ' y el tipo: ' + opDer.tipo + ',  Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function resta(_opIzq, _opDer, _expTipo, _ambito) {
    const opIzq = analizarOperacion(_opIzq,_ambito)
    const opDer = analizarOperacion(_opDer,_ambito)
    const tipoRes = calcTipoResultado(opIzq.tipo, opDer.tipo, _expTipo)
    if(tipoRes != null){
        const resultado =  getSimboloValorReal(opIzq, tipoRes) - getSimboloValorReal(opDer, tipoRes)
        return{
            valor: resultado,
            tipo: tipoRes,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion Resta, con el tipo: ' + opIzq.tipo + ' y el tipo: ' + opDer.tipo + ',  Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function multiplicacion(_opIzq, _opDer, _expTipo, _ambito) { 
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    const tipoRes = calcTipoResultado(opIzq.tipo, opDer.tipo, _expTipo)
    if (tipoRes != null){
        const resultado = getSimboloValorReal(opIzq, tipoRes) * getSimboloValorReal(opDer, tipoRes)
        return{
            valor: resultado,
            tipo: tipoRes,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion Multiplicacion, con el tipo: ' + opIzq.tipo + ' y el tipo: ' + opDer.tipo + ',  Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function division(_opIzq, _opDer, _expTipo, _ambito) { 
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    const tipoRes = calcTipoResultado(opIzq.tipo, opDer.tipo, _expTipo)
    if (tipoRes != null) {
        const resultado = getSimboloValorReal(opIzq, tipoRes) / getSimboloValorReal(opDer, tipoRes)
        return{
            valor: resultado,
            tipo: TIPO_DATO.DECIMAL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion Division, con el tipo: ' + opIzq.tipo + ' y el tipo: ' + opDer.tipo + ',  Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function potencia(_opIzq, _opDer, _expTipo, _ambito) { 
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    const tipoRes = calcTipoResultado(opIzq.tipo, opDer.tipo, _expTipo)
    if (tipoRes != null) {
        const resultado = Math.pow(getSimboloValorReal(opIzq, tipoRes), getSimboloValorReal(opDer, tipoRes))
        return{
            valor: resultado,
            tipo: tipoRes,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion Potencia, con el tipo: ' + opIzq.tipo + ' y el tipo: ' + opDer.tipo + ',  Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function modulo(_opIzq, _opDer, _expTipo, _ambito) { 
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    const tipoRes = calcTipoResultado(opIzq.tipo, opDer.tipo, _expTipo)
    if (tipoRes != null) {
        const resultado = getSimboloValorReal(opIzq, tipoRes) % getSimboloValorReal(opDer, tipoRes)
        return{
            valor: resultado,
            tipo: TIPO_DATO.DECIMAL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion Modulo, con el tipo: ' + opIzq.tipo + ' y el tipo: ' + opDer.tipo + ',  Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function umenos(_op, _expTipo, _ambito) { 
    const op = analizarOperacion(_op, _ambito)
    const tipoRes = calcTipoResultado(TIPO_DATO.ENTERO, op.tipo, _expTipo)
    if (tipoRes != null) {
        const resultado = 0 - getSimboloValorReal(op, tipoRes)
        return{
            valor: resultado,
            tipo:  tipoRes,
            linea: _op.linea,
            columna: _op.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion de Negacion Unaria de una expresion de tipo: ' + op.tipo +', Linea: ' + _op.linea + " Columna: " + _op.columna,
        tipo: null,
        linea: _op.linea,
        columna: _op.columna
    }
}

//__________________________________Expresiones Logicas__________________________________

function analizarExpLogica(expresion, ambito) {
    if (expresion.tipo === TIPO_OPERACION.OR) {
        return or(expresion.opIzq, expresion.opDer, ambito)
    } else if (expresion.tipo === TIPO_OPERACION.AND) {
        return and(expresion.opIzq, expresion.opDer, ambito)
    } else if (expresion.tipo === TIPO_OPERACION.NOT) {
        return not(expresion.op, ambito)
    }
}

function or(_opIzq, _opDer, _ambito) { 
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    const resultado = (opIzq.valor === true || opDer.valor === true)? true : false
    return{
        valor: resultado,
        tipo: TIPO_DATO.BANDERA,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function and(_opIzq, _opDer, _ambito) { 
    const opIzq = analizarOperacion(_opIzq, _ambito)
    const opDer = analizarOperacion(_opDer, _ambito)
    const resultado = (opIzq.valor === true && opDer.valor === true)? true : false
    return{
        valor: resultado,
        tipo: TIPO_DATO.BANDERA,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function not(_op, _ambito) { 
    const op = analizarOperacion(_op, _ambito)
    const resultado = (op.valor === false)? true : false
    return{
        valor: resultado,
        tipo: TIPO_DATO.BANDERA,
        linea: _op.linea,
        columna: _op.columna
    }
}

//_________________________________________OTROS_____________________________________________
function incremento(_exp, _ambito) {
    const varSimbolo = _ambito.getSimbolo(_exp.id, _ambito)
    if (varSimbolo != null && varSimbolo.tipo == TIPO_DATO.ENTERO || varSimbolo.tipo == TIPO_DATO.DECIMAL)  {
        varSimbolo.valor += 1
        _ambito.actualizar(_exp.id, varSimbolo)
        return {
            valor: varSimbolo.valor,
            tipo:  varSimbolo.tipo,
            linea: _exp.linea,
            columna: _exp.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion Incremento... Linea: ' + varSimbolo.linea + " Columna: " + varSimbolo.columna,
        tipo: null,
        linea: varSimbolo.linea,
        columna: varSimbolo.columna
    }
}

function decremento(_exp, _ambito) {
    const varSimbolo = _ambito.getSimbolo(_exp.id, _ambito)
    if (varSimbolo != null && varSimbolo.tipo == TIPO_DATO.ENTERO || varSimbolo.tipo == TIPO_DATO.DECIMAL)  {
        varSimbolo.valor -= 1
        _ambito.actualizar(_exp.id, varSimbolo)
        return {
            valor: varSimbolo.valor,
            tipo:  varSimbolo.tipo,
            linea: _exp.linea,
            columna: _exp.columna
        }
    }
    return{
        valor: '\nError semántico: no se puede realizar la operacion Decremento... Linea: ' + _exp.linea + " Columna: " + _exp.columna,
        tipo: null,
        linea: _exp.linea,
        columna: _exp.columna
    }
}

function casteo(_exp, _ambito) {
    const simboloOriginal = analizarOperacion(_exp.expresion, _ambito)
    let valor
    if (simboloOriginal.tipo === TIPO_DATO.ENTERO && _exp.tipoDeseado === TIPO_DATO.DECIMAL) {
        valor = simboloOriginal.valor
    } else if (simboloOriginal.tipo === TIPO_DATO.ENTERO && _exp.tipoDeseado === TIPO_DATO.CADENA) {
        valor = simboloOriginal.valor.toString()
    } else if (simboloOriginal.tipo === TIPO_DATO.ENTERO && _exp.tipoDeseado === TIPO_DATO.BANDERA) {
        if(simboloOriginal.valor.toString() == "1"){
            simboloOriginal.valor = true;
        } else if (simboloOriginal.valor.toString() == "0"){
            simboloOriginal.valor = false;
        }
        valor = simboloOriginal.valor
    } else if (simboloOriginal.tipo === TIPO_DATO.ENTERO && _exp.tipoDeseado === TIPO_DATO.CARACTER) {
        valor = simboloOriginal.valor.toString()[0]
    } else if (simboloOriginal.tipo === TIPO_DATO.DECIMAL && _exp.tipoDeseado=== TIPO_DATO.ENTERO) {
        valor = simboloOriginal.valor.toFixed() 
    } else if (simboloOriginal.tipo === TIPO_DATO.DECIMAL && _exp.tipoDeseado === TIPO_DATO.CADENA) {
        valor = simboloOriginal.valor.toString()
    } else if (simboloOriginal.tipo === TIPO_DATO.BANDERA && _exp.tipoDeseado === TIPO_DATO.ENTERO) {
        if(simboloOriginal.valor.toString() == "0"){
            simboloOriginal.valor = 0;
        } else if (simboloOriginal.valor.toString() == "1"){
            simboloOriginal.valor = 1;
        }        
        valor = simboloOriginal.valor
    } else if (simboloOriginal.tipo === TIPO_DATO.BANDERA && _exp.tipoDeseado === TIPO_DATO.DECIMAL) {
        if(simboloOriginal.valor.toString() == "0"){
            simboloOriginal.valor = 0.0;
        } else if (simboloOriginal.valor.toString() == "1"){
            simboloOriginal.valor = 1.0;
        }        
        valor = simboloOriginal.valor
    } else if (simboloOriginal.tipo === TIPO_DATO.BANDERA && _exp.tipoDeseado === TIPO_DATO.CHAR) {
        if(simboloOriginal.valor.toString() == "0"){
            simboloOriginal.valor = '0';
        } else if (simboloOriginal.valor.toString() == "1"){
            simboloOriginal.valor = '1';
        }   
        valor = simboloOriginal.valor
    } else if (simboloOriginal.tipo === TIPO_DATO.BANDERA && _exp.tipoDeseado === TIPO_DATO.CADENA) {
        if(simboloOriginal.valor.toString() == "0"){
            simboloOriginal.valor = "0";
        } else if (simboloOriginal.valor.toString() == "1"){
            simboloOriginal.valor = "1";
        }   
        valor = simboloOriginal.valor
    } else if (simboloOriginal.tipo === TIPO_DATO.CARACTER && _exp.tipoDeseado === TIPO_DATO.ENTERO) {
        valor = parseInt(simboloOriginal.valor.toString()[0])
    } else if (simboloOriginal.tipo === TIPO_DATO.CARACTER && _exp.tipoDeseado === TIPO_DATO.DOBLE) {
        valor = parseFloat(simboloOriginal.valor.toString()[0])
    } else if (simboloOriginal.tipo === TIPO_DATO.CARACTER && _exp.tipoDeseado === TIPO_DATO.BANDERA) {
        if(simboloOriginal.valor.toString() == "false"){
            simboloOriginal.valor = false;
        } else if (simboloOriginal.valor.toString() == "true"){
            simboloOriginal.valor = true;
        }   
        valor = simboloOriginal.valor
    } else if (simboloOriginal.tipo === TIPO_DATO.CARACTER && _exp.tipoDeseado === TIPO_DATO.CADENA) {
        valor = simboloOriginal.valor.toString()
    } else if (simboloOriginal.tipo === TIPO_DATO.CADENA && _exp.tipoDeseado === TIPO_DATO.ENTERO) {
        valor = parseInt(simboloOriginal.valor)
    } else if (simboloOriginal.tipo === TIPO_DATO.CADENA && _exp.tipoDeseado === TIPO_DATO.DECIMAL) {
        valor = parseFloat(simboloOriginal.valor)
    } else if (simboloOriginal.tipo === TIPO_DATO.CADENA && _exp.tipoDeseado === TIPO_DATO.BANDERA) {
        if(simboloOriginal.valor == "false"){
            simboloOriginal.valor = false;
        } else if (simboloOriginal.valor.toString() == "true"){
            simboloOriginal.valor = true;
        }   
        valor = simboloOriginal.valor
    } else if (simboloOriginal.tipo === TIPO_DATO.CADENA && _exp.tipoDeseado === TIPO_DATO.CHAR) {
        valor = simboloOriginal.valor.toString()[0]
    } else if (simboloOriginal.tipo === _exp.tipoDeseado) {
        valor = simboloOriginal.valor
    } else {
        return{
            valor: '\nError semántico: no se puede realizar casteo... Linea: ' + _exp.linea + " Columna: " + _exp.columna,
            tipo: null,
            linea: _exp.linea,
            columna: _exp.columna
        }
    }
    return {
        valor: valor,
        tipo:  _exp.tipoDeseado,
        linea: _exp.linea,
        columna: _exp.columna
    }
}

function AccesoVector(expresion, ambito) {
    respuesta = {
        valor: null,
        tipo:  null,
        linea: expresion.linea,
        columna: expresion.columna
    }
    vecSimbolo = ambito.getSimbolo(expresion.idVector)
    indiceSimbolo = analizarOperacion(expresion.indiceExp, ambito)
    if (vecSimbolo === null) {
        respuesta.valor =  `Erro Semantico: no existe el vector: ${expresion.idVector}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
        return respuesta
    } else if (indiceSimbolo.tipo != TIPO_DATO.ENTERO) {
        respuesta.valor =  `Erro Semantico: para acceder a un vector la expresion debe ser de tipo Entero, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
        return respuesta
    } else if (indiceSimbolo.valor < 0 || indiceSimbolo.valor >= vecSimbolo.valor.length) {
        respuesta.valor =  `Erro Semantico: indice: ${indiceSimbolo.valor} fuera de los limites,  Linea: ${expresion.linea}, Columna: ${expresion.columna}`
        return respuesta
    } 
    respuesta.valor = ambito.getSimbolo(expresion.idVector).valor[analizarOperacion(expresion.indiceExp, ambito).valor]
    respuesta.tipo = vecSimbolo.tipoVector
    return respuesta
}

//______________________________________LLAMDA FUNC METODO______________________________________
function llamdaFuncMetodo(expresion, ambito) {
    res = ejecutarBloqueIns([expresion], ambito)
    return res.returnSimbolo
}

//______________________________________Acceso METODO______________________________________
function AccesoLista(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  null,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simboloLista = ambito.getSimbolo(expresion.idLista)
    simboloIndice = analizarOperacion(expresion.expIndice, ambito)
    simboloRes.tipo = simboloLista.tipoLista
    if (simboloLista === null) {
        simboloRes.valor = `Error: No existe una lista con el nombre: ${expresion.idLista}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    }  else if (simboloIndice.tipo !== TIPO_DATO.ENTERO) {
        simboloRes.valor = `Error: El indice de acceso de una lista debe ser de tipo  tipo: ${TIPO_DATO.ENTERO}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    }  else if (simboloIndice.valor < 0 || simboloIndice.valor >=  simboloLista.valor.length) {
        simboloRes.valor = `Error: Indice fuera de limites para la lista: ${expresion.idLista}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else {
        simboloRes.valor = simboloLista.valor[simboloIndice.valor]
    }
    return simboloRes
}

//______________________________________OPERADOR TERNARIO______________________________________
function OperadorTernario(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  null,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simbCondicion = analizarOperacion(expresion.expCondicion, ambito)  
    if (simbCondicion.tipo !== TIPO_DATO.BANDERA) {
        simboloRes.valor = `Error: La primera expresion del Operador ternario debe ser de tipo: ${TIPO_DATO.BANDERA}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else if (simbCondicion.valor) {
        return analizarOperacion(expresion.expUno, ambito)
    } else {
        return analizarOperacion(expresion.expDos, ambito) 
    }
    return simboloRes
}

//______________________________________FUNC NATIVA______________________________________
function toLower(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  TIPO_DATO.CADENA,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simboloExp = analizarOperacion(expresion.exp, ambito)
    if (simboloExp.tipo  !== TIPO_DATO.CADENA) {
        simboloRes.valor = `Error: La funcion toLower recibe un expresion de tipo: ${TIPO_DATO.CADENA}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else {
        simboloRes.valor = simboloExp.valor.toLowerCase()
    }
    return simboloRes
}

function toUpper(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  TIPO_DATO.CADENA,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simboloExp = analizarOperacion(expresion.exp, ambito)
    if (simboloExp.tipo  !== TIPO_DATO.CADENA) {
        simboloRes.valor = `Error: La funcion toUpper recibe un expresion de tipo: ${TIPO_DATO.CADENA}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else {
        simboloRes.valor = simboloExp.valor.toUpperCase()
    }
    return simboloRes
}

function Length(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  TIPO_DATO.ENTERO,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simboloExp = analizarOperacion(expresion.exp, ambito)
    if (simboloExp && simboloExp.tipo  !== TIPO_DATO.CADENA && simboloExp.tipo  !== TIPO_DATO.VECTOR
        && (simboloExp.tipo  !== TIPO_DATO.ENTERO) && simboloExp.tipo  !== TIPO_DATO.LISTA) {
        simboloRes.valor = `Error: La funcion Length recibe un expresion de tipo: ${TIPO_DATO.CADENA} o ${TIPO_DATO.VECTOR} o ${TIPO_DATO.LISTA}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else {
        simboloRes.valor = simboloExp.valor.length
    }
    return simboloRes
}

function Truncate(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  TIPO_DATO.ENTERO,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simboloExp = analizarOperacion(expresion.exp, ambito)
    if (simboloExp.tipo  !== TIPO_DATO.ENTERO && simboloExp.tipo  !== TIPO_DATO.DECIMAL) {
        simboloRes.valor = `Error: La funcion truncate recibe un expresion de tipo: ${TIPO_DATO.ENTERO} o ${TIPO_DATO.DECIMAL}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else {
        simboloRes.valor = Math.trunc(simboloExp.valor)
    }
    return simboloRes
}

function Round(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  TIPO_DATO.ENTERO,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simboloExp = analizarOperacion(expresion.exp, ambito)
    if (simboloExp.tipo  !== TIPO_DATO.ENTERO && simboloExp.tipo  !== TIPO_DATO.DECIMAL) {
        simboloRes.valor = `Error: La funcion Round recibe un expresion de tipo: ${TIPO_DATO.ENTERO} o ${TIPO_DATO.DECIMAL}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else {
        simboloRes.valor = Math.round(simboloExp.valor)
    }
    return simboloRes
}

function TypeOf(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  TIPO_DATO.CADENA,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simboloExp = analizarOperacion(expresion.exp, ambito)
    if (simboloExp != null) {
        simboloRes.valor = simboloExp.tipo
    }
    return simboloRes
}

function ToString(expresion, ambito) {
    simboloRes = {
        valor: null,
        tipo:  TIPO_DATO.CADENA,
        linea: expresion.linea,
        columna: expresion.columna
    }
    simboloExp = analizarOperacion(expresion.exp, ambito)
    if (simboloExp.tipo  !== TIPO_DATO.ENTERO && simboloExp.tipo !== TIPO_DATO.DECIMAL &&
        simboloExp.tipo  !== TIPO_DATO.BANDERA && simboloExp.tipo !== TIPO_DATO.CARACTER) {
        simboloRes.valor = `Error: La funcion toString recibe un expresion de tipo: ${TIPO_DATO.ENTERO} o ${TIPO_DATO.DECIMAL} o ${TIPO_DATO.BANDERA}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else {
        simboloRes.valor = String(simboloExp.valor)
    }
    return simboloRes
}

function ToCharArray(expresion, ambito) {
    simboloRes =  {
        id: "",
        valor: [],
        tipo: TIPO_VALOR.LISTA,
        tipoLista: instruccion.tipoLista,
        linea: instruccion.linea,
        columna: instruccion.columna,
    }   
    simboloExp = analizarOperacion(expresion.exp, ambito)
    if (simboloExp.tipo !== TIPO_DATO.CADENA) {
        simboloRes.valor = `Error: La funcion toCharArray recibe un expresion de tipo: ${TIPO_DATO.CADENA}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else {
        simboloRes.valor = simboloExp.valor.split("")
    }
    return simboloRes
}