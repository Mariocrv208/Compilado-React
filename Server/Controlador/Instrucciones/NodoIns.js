const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")

const NodoIns = {

    nuevoPrint: function(_expresion, _linea, _columna, idSent){
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoValor: function(_valor, _tipo, _linea, _columna, idSent){
        return {
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevaOperacionBinaria: function(_opIzq, _opDer, _tipo, _linea, _columna, idSent){
        return {
            opIzq: _opIzq,
            opDer: _opDer,
            tipo: _tipo,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevaOperacionUnaria: function(_op, _tipo, _linea, _columna, idSent) {
        return {
            op: _op,
            tipo: _tipo,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        } 
    },

    nuevaActualizacion: function(_id, _tipo, _linea, _columna, idSent) {
        return {
            tipo: _tipo,
            id: _id,
            linea: _linea,
            columna: _columna,
            idSent: idSent,  
        }
    },

    nuevaDeclaracion: function(_id, _valor, _tipo, _linea, _columna, idSent){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id, 
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevaAsignacion: function(_id, _expresion, _linea, _columna, idSent){
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoWhile: function(_condicion, _listaIns, _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            condicion: _condicion,
            listaIns: _listaIns,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoDoWhile: function(_listaIns, _condicion, _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.DOWHILE,
            condicion: _condicion, 
            listaIns: _listaIns,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoIf: function(_ifSimple, _listaElseIf, _listaInsElse,  _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.IF,
            ifSimple: _ifSimple,
            listaElseIf: _listaElseIf,
            listaInsElse: _listaInsElse,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoIfSimple: function(_condicion, _listaIns,  _linea, _columna, idSent) {
        return {
            condicion: _condicion,
            listaIns: _listaIns,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoElseIf: function(_condicion, _listaIns,  _linea, _columna,idSent) {
        return {
            condicion: _condicion,
            listaIns: _listaIns,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoBreak: function(_linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoContinue: function(_linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.CONTINUE,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    //______________________________________ SWITCH___________________________________________
    nuevoSwitch: function(_expresion, _switchCuerpo, _linea, _columna, idSent) {
        return  {
            tipo: TIPO_INSTRUCCION.SWITCH,
            expresion: _expresion,
            switchCuerpo: _switchCuerpo,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoSwitchCuerpo: function(_caseList, _defaultListIns, _linea, _columna, idSent) {
        return  {
            caseList: _caseList,
            defaultListIns: _defaultListIns,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoCase: function(_expCase, _caseListIns, _linea, _columna, idSent) {
        return  {
            expCase: _expCase,
            caseListIns: _caseListIns,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    //_______________________________________FOR_____________________________________________
    nuevoFor: function(_iniFor,  _condicionFor, _actualizacion, _listaInsFor,  _linea, _columna, idSent) {
        return  {
            tipo: TIPO_INSTRUCCION.FOR,
            iniFor: _iniFor,
            condicionFor: _condicionFor,
            actualizacion: _actualizacion,
            listaInsFor: _listaInsFor,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    //_______________________________________DEC METODO_____________________________________________
    nuevaDecMetodo: function(_tipoRetorno, _nombre, _listaParams, _listaIns, _linea, _columna, idSent){
        return {
            tipo: TIPO_INSTRUCCION.DECMETODO,
            tipoRetorno: _tipoRetorno,
            nombre: _nombre,
            listaParams: _listaParams,
            listaIns: _listaIns,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevaLLamdaFuncionMetodo: function(_id, _listaValores, _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.LLAMADA_FUNC_METODO,
            id: _id,
            listaValores: _listaValores,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoParametro: function(_tipo, _id, _linea, _columna, idSent) {
        return {
            tipo: "VAL_"+ _tipo,
            valor: _id,
            tipoParam: _tipo,
            id: _id,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    //_______________________________________EXEC_____________________________________________
    nuevoExec: function(_id, _listaValores, _linea, _columna, idSent) {
        return  {
            tipo: TIPO_INSTRUCCION.EXEC,
            id: _id,
            listaValores: _listaValores,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    //_______________________________________Casteo_____________________________________________
    nuevoCasteo: function(_tipoDeseado, _expresion, _linea, _columna, idSent) {
        return  {
            tipo: TIPO_OPERACION.CASTEO,
            tipoDeseado: _tipoDeseado,
            expresion: _expresion,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        } 
    },
    //_______________________________________Vectores_____________________________________________
    nuevaDecVectorFormaUno: function(_tipoVector,  _idVector, _tipoInstanciaVector, _expLongitud, _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.DEC_VEC_FORMA_UNO,
            tipoVector: _tipoVector,
            idVector: _idVector,
            tipoInstanciaVector: _tipoInstanciaVector,
            expLongitud: _expLongitud,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevaDecVectorFormaDos: function(_tipoVector,  _idVector, _listaValores, _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.DEC_VEC_FORMA_DOS,
            tipoVector: _tipoVector,
            idVector: _idVector,
            listaValores: _listaValores,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoAccesoVector: function(_idVector, _indiceExps, _linea, _columna, idSent) {
        return {
            tipo: TIPO_OPERACION.ACCESO_VECTOR,
            idVector: _idVector,
            indiceExp: _indiceExps,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevaModVector: function(_idVector, _indiceExp, _valorExp, _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.MODIFICAR_VECTOR,
            idVector: _idVector,
            indiceExp: _indiceExp,
            valorExp: _valorExp,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    //_______________________________________DEC LISTA_____________________________________________
    nuevaDecLista: function(_tipoLista, _idLista, _tipoInstanciaLista, _linea, _columna, idSent){
        return {
            tipo: TIPO_INSTRUCCION.DEC_LISTA,
            tipoLista: _tipoLista,
            idLista: _idLista,
            tipoInstanciaLista: _tipoInstanciaLista,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevaDecListaFormaDos: function(_tipoLista, _idLista, _expLista, _linea, _columna, idSent){
        return {
            tipo: TIPO_INSTRUCCION.DEC_LISTA_FORMA_2,
            tipoLista: _tipoLista,
            idLista: _idLista,
            expLista: _expLista,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoAgregarLista: function(_idLista, _expValor, _linea, _columna, idSent){
        return {
            tipo: TIPO_INSTRUCCION.AGREGAR_LISTA,
            idLista: _idLista,
            expValor: _expValor,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevaModLista: function(_idLista, _expIndice,  _expValor, _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.MODIFICAR_LISTA,
            idLista: _idLista,
            expIndice: _expIndice,
            expValor: _expValor,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    nuevoAccesoLista: function(_idLista, _expIndice, _linea, _columna, idSent){
        return {
            tipo: TIPO_OPERACION.ACCESO_LISTA,
            idLista: _idLista,
            expIndice: _expIndice,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    //____________________________________OERADOR TERNARIO______________________________________
    nuevoOpTernario: function(_expCondicion, _expUno, _expDos, _linea, _columna, idSent) {
        return {
            tipo: TIPO_OPERACION.OPERADOR_TERNARIO,
            expCondicion: _expCondicion,
            expUno: _expUno,
            expDos: _expDos,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },


    //_______________________________________Return_____________________________________________
    nuevoReturn: function(_expReturn, _linea, _columna, idSent) {
        return {
            tipo: TIPO_INSTRUCCION.RETURN,
            expReturn: _expReturn,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

    //____________________________________FUNCS NATIVAS_________________________________________
    nuevaFuncNativa: function(_tipoFunc, _exp, _linea, _columna, idSent) {
        return {
            tipo: TIPO_OPERACION.FUNC_NATIVA,
            tipoFunc: _tipoFunc,
            exp: _exp,
            linea: _linea,
            columna: _columna,
            idSent: idSent,
        }
    },

}


module.exports = NodoIns