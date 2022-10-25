module.exports = ejecutarBloqueIns
const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Print = require("./Print");
const Declaracion = require("./Declaracion");
const analizarOperacion = require("../Operaciones/analizarOperacion");
const Ambito = require("../Entorno/Ambito");
const Tipo_Instruccion = require("../Tipos/TipoInstruccion");
const TIPO_DATO = require("../Tipos/TipoDato");
const TIPO_VALOR = require("../Tipos/TipoValor");
const Simbolo = require("../Entorno/Simbolo");
const { nuevoValor } = require("./NodoIns");
const  DecMetodo  = require("./DecMetodo");

function ejecutarBloqueIns(listaInstrucciones, ambito) {
    var respuesta =  {
        textoConsola: "",
        breakEncontrado: false,
        continueEncontrado: false,
        returnEncontrado: false,
        returnSimbolo: null,
    }
    for (instruccion of listaInstrucciones) {
        if(instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
            respuesta.textoConsola += Print(instruccion, ambito) + '\n'
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, ambito)
            if(mensaje != null){
                respuesta.textoConsola += mensaje + '\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(instruccion, ambito)
            if(mensaje != null) {
                respuesta.textoConsola += mensaje + '\n'
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var resWhile = While(instruccion, ambito)
            respuesta.textoConsola += resWhile.textoConsola
            if (resWhile.returnEncontrado) {
                respuesta.returnEncontrado = true
                respuesta.returnSimbolo = resWhile.returnSimbolo
                return respuesta
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
            var resDoWhile = DoWhile(instruccion, ambito)
            respuesta.textoConsola += resDoWhile.textoConsola
            if (resDoWhile.returnEncontrado) {
                respuesta.returnEncontrado = true
                respuesta.returnSimbolo = resDoWhile.returnSimbolo
                return respuesta
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.IF) {
            var res = If(instruccion, ambito)
            respuesta.textoConsola += res.textoConsola
            if (res.breakEncontrado) {
                respuesta.breakEncontrado = true
                return respuesta
            } else if (res.continueEncontrado) {
                respuesta.continueEncontrado = true
            } else if (res.returnEncontrado) {
                respuesta.returnEncontrado = true
                respuesta.returnSimbolo = res.returnSimbolo
                return respuesta
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.INCREMENTO || instruccion.tipo === TIPO_INSTRUCCION.DECREMENTO) {
            respuesta.textoConsola +=  Actualizacion(instruccion, ambito)
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK) {
            respuesta.breakEncontrado = true
            return respuesta
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE) {
            respuesta.continueEncontrado = true
            return respuesta
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN) {
            respuesta.returnEncontrado = true
            res = Return(instruccion, ambito)
            respuesta.returnSimbolo = res
            return respuesta
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH) {
            const res = Switch(instruccion, ambito)
            respuesta.textoConsola += res.textoConsola
            if (res.breakEncontrado) {
                respuesta.breakEncontrado = true
                return respuesta
            } else if (res.continueEncontrado) {
                respuesta.continueEncontrado = true
                return respuesta
            } else if (res.returnEncontrado) {
                respuesta.returnEncontrado = true
                respuesta.returnSimbolo = res.returnSimbolo
            }
        }
        
        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR) {
            res = For(instruccion, ambito)
            respuesta.textoConsola += res.textoConsola
            if (res.returnEncontrado) {
                respuesta.returnEncontrado = true
                respuesta.returnSimbolo = res.returnSimbolo
                return respuesta
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.DECMETODO) {
            respuesta.textoConsola += DecMetodo(instruccion, ambito)
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_FUNC_METODO) {
            resExec = Exec(instruccion, ambito)
            respuesta.textoConsola += resExec.textoConsola
            if (resExec.returnEncontrado) {
                respuesta.returnEncontrado = true
                respuesta.returnSimbolo = resExec.returnSimbolo
                return respuesta
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.EXEC) {
            resExec = Exec(instruccion, ambito)
            respuesta.textoConsola += resExec.textoConsola
            if (resExec.returnEncontrado) {
                respuesta.returnEncontrado = true
                respuesta.returnSimbolo = resExec.returnSimbolo
                return respuesta
            }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_VEC_FORMA_UNO) {
            respuesta.textoConsola += DecVecFormaUno(instruccion, ambito)
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_VEC_FORMA_DOS) {
            respuesta.textoConsola += DecVecFormaDos(instruccion, ambito)
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.MODIFICAR_VECTOR) {
            respuesta.textoConsola += ModificarVector(instruccion, ambito)
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_LISTA) {
            respuesta.textoConsola += DecLista(instruccion, ambito)
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_LISTA_FORMA_2) {
            respuesta.textoConsola += DecListaFormaDos(instruccion, ambito)
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.AGREGAR_LISTA) {
            respuesta.textoConsola += AgregarLista(instruccion, ambito)
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.MODIFICAR_LISTA) {
            respuesta.textoConsola += ModificarLista(instruccion, ambito)
        }
    }
    return respuesta
}

//___________________________________Ejecucion de Instruccion__________________________________
//_____________________________________________________________________________________________


//____________________________________________WHILE____________________________________________
function While(insWhile, ambito) {
    var resWhile =  {
        textoConsola: "",
        breakEncontrado: false,
        continueEncontrado: false,
        returnEncontrado: false,
        returnSimbolo: null,
    }
    while (analizarOperacion(insWhile.condicion, ambito).valor) {
        let nuevoAmbito = new Ambito(ambito, "While")
        resIns = ejecutarBloqueIns(insWhile.listaIns, nuevoAmbito)
        resWhile.textoConsola += resIns.textoConsola
        if (resIns.breakEncontrado) {
            return resWhile
        } else if (resIns.returnEncontrado) {
            resWhile.returnEncontrado  = true
            resWhile.returnSimbolo = resIns.returnSimbolo
            return resWhile
        }
    }
    return resWhile
}

//______________________________________DO WHILE_______________________________________________
function DoWhile(insDoWhile, ambito) {
    var resDoWhile =  {
        textoConsola: "",
        breakEncontrado: false,
        continueEncontrado: false,
        returnEncontrado: false,
        returnSimbolo: null,
    }
    do  {
        for (let ins of insDoWhile.listaIns) {
            let nuevoAmbito = new Ambito(ambito, "DoWhile")
            resIns = ejecutarBloqueIns([ins], nuevoAmbito)
            resDoWhile.textoConsola += resIns.textoConsola
            if (resIns.breakEncontrado) {
                return resDoWhile
            } else if (resIns.continueEncontrado) {
                break;
            } else if (resIns.returnEncontrado) {
                resDoWhile.returnEncontrado = true
                resDoWhile.returnSimbolo = resIns.returnSimbolo
                return resDoWhile
            }
        }
    } while(analizarOperacion(insDoWhile.condicion, ambito).valor)
    return resDoWhile
}

//________________________________________IF________________________________________________

function If(insIf, ambito) {
    var respuesta =  {
        textoConsola: "",
        breakEncontrado: false,
        continueEncontrado: false,
        returnEncontrado: false,
        returnSimbolo: null,
    }
    let condicionCumplida = false
    if (analizarOperacion(insIf.ifSimple.condicion, ambito).valor) {
        condicionCumplida = true
        let nuevoAmbito = new Ambito(ambito, "If")
        respuesta = ejecutarBloqueIns(insIf.ifSimple.listaIns, nuevoAmbito)
    } 
    if (!condicionCumplida) {
        for (elseIf of insIf.listaElseIf) {
            if (analizarOperacion(elseIf.condicion, ambito).valor) {
                condicionCumplida = true
                let nuevoAmbito = new Ambito(ambito, "ElseIf")
                respuesta = ejecutarBloqueIns(elseIf.listaIns, nuevoAmbito)
            }
        }
    }
    if (!condicionCumplida) {
        let nuevoAmbito = new Ambito(ambito, "Else")
        respuesta = ejecutarBloqueIns(insIf.listaInsElse, nuevoAmbito)
    }
    return respuesta
}

//_____________________________________ACTUALIZACION___________________________________________
function Actualizacion(insActualizacion, ambito) {
    let textoConsola = ""
    let simbolo = ambito.getSimbolo(insActualizacion.id, ambito)
    if (simbolo != null && (simbolo.tipo == TIPO_DATO.ENTERO || simbolo.tipo == TIPO_DATO.DECIMAL)) {
        if (insActualizacion.tipo == TIPO_INSTRUCCION.INCREMENTO) {
            simbolo.valor += 1
        }  else if (insActualizacion.tipo == TIPO_INSTRUCCION.DECREMENTO) {
            simbolo.valor -= 1
        }
        ambito.actualizar(insActualizacion.id, simbolo)
    } else {
        textoConsola = "No se puede realizar la operacion " + insActualizacion.tipo
    }
    return textoConsola
}

//______________________________________SWTICH________________________________________________
function Switch(insSwitch, ambito) {
    var respuesta =  {
        textoConsola: "",
        breakEncontrado: false,
        continueEncontrado: false,
        returnEncontrado: false,
        returnSimbolo: null,
    }
    let huboMatch = false
    let huboBreak = false
    const valorExp = analizarOperacion(insSwitch.expresion, ambito).valor
    for (let caso of insSwitch.switchCuerpo.caseList) {
        let nuevoAmbito = new Ambito(ambito, "Switch")
        let valorExpCase = analizarOperacion(caso.expCase, nuevoAmbito).valor
        if ( ( !huboMatch && ( valorExp === valorExpCase ) ) || ( huboMatch && !huboBreak ) ) {
            huboMatch = true
            for (let ins of caso.caseListIns) {  
                resIns = ejecutarBloqueIns([ins], nuevoAmbito)
                respuesta.textoConsola += resIns.textoConsola
                if (resIns.breakEncontrado) {
                    huboBreak = true
                    return respuesta
                } else if (resIns.continueEncontrado) {
                    respuesta.continueEncontrado = true
                    break
                } else if (resIns.returnEncontrado) {
                    respuesta.returnEncontrado = true
                    respuesta.returnSimbolo = resIns.returnSimbolo
                    return respuesta
                }
            }
        }

    }
    if (!huboMatch || ( huboMatch && !huboBreak )) {
        let nuevoAmbito = new Ambito(ambito, "Switch")
        for (let ins of insSwitch.switchCuerpo.defaultListIns) {
            resIns = ejecutarBloqueIns([ins], nuevoAmbito)
            respuesta.textoConsola += resIns.textoConsola
            if (resIns.breakEncontrado) {
                huboBreak = true
                return respuesta
            } else if (resIns.continueEncontrado) {
                respuesta.continueEncontrado = true
                break
            } 
        }
    }
    return respuesta
}

//______________________________________FOR________________________________________________
function For(insFor, ambito) {
    var respuesta =  {
        textoConsola: "",
        returnEncontrado: false,
        returnSimbolo: null,
    } 
    respuesta.textoConsola += ejecutarBloqueIns([insFor.iniFor], ambito).textoConsola
    while(analizarOperacion(insFor.condicionFor, ambito).valor) {
        let nuevoAmbito = new Ambito(ambito, "For")
        resIns = ejecutarBloqueIns(insFor.listaInsFor, nuevoAmbito)
        respuesta.textoConsola += resIns.textoConsola
        if (resIns.breakEncontrado) {
            if (insFor.iniFor.tipo === TIPO_INSTRUCCION.DECLARACION){
                ambito.tablaSimbolos.delete(insFor.iniFor.id) 
            }
            return respuesta
        } else if (resIns.returnEncontrado) {
            respuesta.returnEncontrado = true
            respuesta.returnSimbolo = resIns.returnSimbolo
            if (insFor.iniFor.tipo === TIPO_INSTRUCCION.DECLARACION){
                ambito.tablaSimbolos.delete(insFor.iniFor.id) 
            }
            return respuesta
        }
        respuesta.textoConsola += ejecutarBloqueIns([insFor.actualizacion], ambito).textoConsola
    }
    if (insFor.iniFor.tipo === TIPO_INSTRUCCION.DECLARACION){
        ambito.tablaSimbolos.delete(insFor.iniFor.id) 
    }
    return respuesta
}

//______________________________________EXEC________________________________________________
function Exec(instruccion, ambito) {
    var respuesta =  {
        textoConsola: "",
        returnEncontrado: false,
        returnSimbolo: null,
    }
    const metodoPorEjecutar = ambito.getMetodo(instruccion.id)
    if (metodoPorEjecutar != null) {
        let nuevoAmbito = new Ambito(ambito, instruccion.id)
        if (instruccion.listaValores.length === metodoPorEjecutar.listaParams.length) {
            for (let i = 0; i < instruccion.listaValores.length; i++) {
                valorEntrada = analizarOperacion(instruccion.listaValores[i], ambito)
                if (valorEntrada.tipo === metodoPorEjecutar.listaParams[i].tipoParam) {
                    nuevoAmbito.addSimbolo(metodoPorEjecutar.listaParams[i].id, valorEntrada)
                } else {
                    respuesta.textoConsola =  `Error: El parametro: ${metodoPorEjecutar.listaParams[i].id}, es de tipo: ${metodoPorEjecutar.listaParams[i].tipoParam}, se ha dado un valor de tipo: ${valorEntrada.tipo}`
                    return respuesta
                }
            }
        } else {
            respuesta.textoConsola = `Error: El método: ${instruccion.id}, require ${metodoPorEjecutar.listaParams.length} parametros, No. de parametros dados: ${instruccion.listaValores.length }`
            return respuesta
        }
        res = ejecutarBloqueIns(metodoPorEjecutar.listaIns, nuevoAmbito)
        respuesta.textoConsola += res.textoConsola
        if (res.returnEncontrado && metodoPorEjecutar.tipoRetorno != null) {
            if (res.returnSimbolo.tipo !== metodoPorEjecutar.tipoRetorno) {
                respuesta.textoConsola += `Error: El método ${instruccion.id} es de tipo: ${metodoPorEjecutar.tipoRetorno} y esta returnando una expresion de tipo: ${res.returnSimbolo.tipo}, Linea: ${instruccion.linea} Columna: ${instruccion.columna}`
            } 
            respuesta.returnEncontrado = true
            respuesta.returnSimbolo = res.returnSimbolo
        }
    } else {
        respuesta.textoConsola += `Error: El método ${instruccion.id} no existe... Linea: ${instruccion.linea} Columna: ${instruccion.columna}`
    }
    return respuesta
}

//______________________________________DEC VECTORES________________________________________________
function DecVecFormaUno(expresion, ambito) {
    if (ambito.existeSimbolo(expresion.idVector) || ambito.existeMetodo(expresion.idVector)) {
        return `Error: El nombre del vector ${expresion.idVector} ya se encuentra registrado en la tabla de simbolos, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else if (expresion.tipoVector !== expresion.tipoInstanciaVector) {
        return `Error: No puedes instanciar un vector de tipo: ${expresion.tipoInstanciaVector}, a un vector que es de tipo: ${expresion.tipoVector}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } 
    simbTamañoVector = analizarOperacion(expresion.expLongitud, ambito)
    if (simbTamañoVector.tipo != TIPO_DATO.ENTERO) {
        return  `Error: La expresion para el tamaño del vetor debe ser de tipo Entero, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    }
    vector = []
    let valorPorDefecto = null
    switch(expresion.tipoVector) {
        case TIPO_DATO.ENTERO:
            valorPorDefecto = 0
            break
        case TIPO_DATO.DECIMAL:
            valorPorDefecto = 0
            break
        case TIPO_DATO.BANDERA:
            valorPorDefecto = false
            break
        case TIPO_DATO.CARACTER:
            valorPorDefecto = ''
            break
        case TIPO_DATO.CADENA:
            valorPorDefecto = ""
            break
    }
    for (let i = 0; i < simbTamañoVector.valor; i++) {
        vector.push(valorPorDefecto)
    }
    simbolo = simbolo = {
        tipo: TIPO_VALOR.VECTOR,
        id: expresion.idVector,
        valor: vector,
        tipoVec: expresion.tipoVector,
        tipoVector:  expresion.tipoVector,
        linea: expresion.linea,
        columna: expresion.columna
    }
    ambito.addSimbolo(expresion.idVector, simbolo)
    return ''
}

function DecVecFormaDos(expresion, ambito) {
    if (ambito.existeSimbolo(expresion.idVector) || ambito.existeMetodo(expresion.idVector)) {
        return `Error: El nombre del vector ${expresion.idVector} ya se encuentra registrado en la tabla de simbolos, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    }
    vector = []
    for (let valor of expresion.listaValores) {
        simbolo = analizarOperacion(valor, ambito)
        if (simbolo.tipo !== expresion.tipoVector) {
            return `Error: El elemento ${simbolo.valor} no puede ser ingresado un vector de tipo: ${expresion.tipoVector}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
        }
        vector.push(simbolo.valor)
    }
    simbolo = simbolo = {
        tipo: TIPO_VALOR.VECTOR,
        id: expresion.idVector,
        valor: vector,
        tipoVec: expresion.tipoVector,
        tipoVector:  expresion.tipoVector,
        linea: expresion.linea,
        columna: expresion.columna
    }
    ambito.addSimbolo(expresion.idVector, simbolo)
    return ''
}

function ModificarVector(expresion, ambito) {
    simboloVector = ambito.getSimbolo(expresion.idVector)
    simboloIndice = analizarOperacion(expresion.indiceExp, ambito)
    simboloExp = analizarOperacion(expresion.valorExp, ambito)
    if (simboloVector === null) {
        return `Error: El vector: ${expresion.idVector} no existe dentro de la tabla de simbolos, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else if (simboloIndice.tipo !== TIPO_DATO.ENTERO || (simboloIndice.valor < 0 ||  simboloIndice.valor >= simboloVector.valor.length)) {
        return `Error: El indice no es valido para el vector: ${expresion.idVector}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    } else if (simboloExp.tipo !== simboloVector.tipoVec) {
        return `Error: No se puede asignar un valor de tipo:  ${simboloExp.tipo} a un vetor de tipo: ${simboloVector.tipoVec}, Linea: ${expresion.linea}, Columna: ${expresion.columna}`
    }
    ambito.getSimbolo(expresion.idVector).valor[analizarOperacion(expresion.indiceExp, ambito).valor] = analizarOperacion(expresion.valorExp, ambito).valor
    ambito.addSimbolo(expresion.idVector, simboloVector)
    return ''
}

//______________________________________Dec Lista_____________________________________________
function DecLista(instruccion, ambito) {
    if (ambito.existeSimbolo(instruccion.idLista) || ambito.existeMetodo(instruccion.idLista)) {
        return `Error: No se puede declarar una lista con el nombre: ${instruccion.idLista}, pues este ya se encuentra registrado en la tabla de simbolos, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    } else if (instruccion.tipoLista !== instruccion.tipoInstanciaLista) {
        return `Error: Una lista de tipo: ${instruccion.tipoLista}, no puede ser instanciada de tipo: ${instruccion.tipoInstanciaLista}, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    }
    ambito.addSimbolo(instruccion.idLista, {
        id: instruccion.idLista,
        valor: [],
        tipo: TIPO_VALOR.LISTA,
        tipoLista: instruccion.tipoLista,
        linea: instruccion.linea,
        columna: instruccion.columna,
    })
    return ''
}

function DecListaFormaDos(instruccion, ambito) {
    if (ambito.existeSimbolo(instruccion.idLista) || ambito.existeMetodo(instruccion.idLista)) {
        return `Error: No se puede declarar una lista con el nombre: ${instruccion.idLista}, pues este ya se encuentra registrado en la tabla de simbolos, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    } 
    simboloCadena = analizarOperacion(instruccion.expLista, ambito)
    ambito.addSimbolo(instruccion.idLista, {
        id: instruccion.idLista,
        valor: simboloCadena.valor,
        tipo: TIPO_VALOR.LISTA,
        tipoLista: instruccion.tipoLista,
        linea: instruccion.linea,
        columna: instruccion.columna,
    })
    return ''
}

function AgregarLista(instruccion, ambito) {
    lista = ambito.getSimbolo(instruccion.idLista)
    simboloElem = analizarOperacion(instruccion.expValor, ambito)
    if (lista === null) {
        return `Error: No existe una lista con el nombre: ${instruccion.idLista}, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    } else if (simboloElem.tipo !== lista.tipoLista) {
        return `Error: No se puede agregar elementos de tipo: ${simboloElem.tipo}, a una lista de tipo: ${lista.tipoLista}, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    }
    lista.valor.push(simboloElem.valor)
    return ''
}

function ModificarLista(instruccion, ambito) {
    simboloLista = ambito.getSimbolo(instruccion.idLista)
    simboloIndice = analizarOperacion(instruccion.expIndice, ambito)
    simboloValor = analizarOperacion(instruccion.expValor, ambito)
    if (simboloLista === null) {
        return `Error: No existe una lista con el nombre: ${instruccion.idLista}, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    } else if (simboloIndice.tipo !== TIPO_DATO.ENTERO) {
        return `Error: El indice de acceso de una lista debe ser de tipo  tipo: ${TIPO_DATO.ENTERO}, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    }  else if (simboloIndice.valor < 0 || simboloIndice.valor >=  simboloLista.valor.length) {
        return `Error: Indice fuera de limites para la lista: ${instruccion.idLista}, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    } else if (simboloValor.tipo !=  simboloLista.tipoLista) {
        return `Error: No se puede asignar elementos de tipo: ${simboloValor.tipo}, a una lista de tipo: ${lista.tipoLista}, Linea: ${instruccion.linea}, Columna: ${instruccion.columna}`
    } // no esta cambiando solo se queda en 1
    ambito.getSimbolo(instruccion.idLista).valor[analizarOperacion(instruccion.expIndice, ambito).valor] = analizarOperacion(instruccion.expValor, ambito).valor
    return ''
}

//______________________________________Return________________________________________________
function Return(instruccion, ambito) {    
    if (instruccion.expReturn === null) {
        return null
    }
    respuesta = analizarOperacion(instruccion.expReturn, ambito)  
    return respuesta
}