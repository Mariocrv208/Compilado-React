module.exports = graficarAst
const { exec } = require("child_process");
const fs = require('fs');
const TIPO_DATO = require("../Tipos/TipoDato");

const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")
const TIPO_VALOR = require("../Tipos/TipoValor")

function formatId(numId) {
    return "nodo" + numId.toString()
}

function defNodo(nodoId, etiqueta) {
    return  formatId(nodoId) + "[label=\"" + etiqueta + "\"] \n"
}   

function defEdge(id1, id2) {
    return formatId(id1) + " -> " + formatId(id2) + "\n"
}

function getNodo(id, etiqueta, idPadre) {
    dotText = ""
    dotText += defNodo(id, etiqueta)
    dotText += defEdge(idPadre, id)
    return dotText
}

function graficarAst(arbolAst) {
    dotText = "digraph arbolAst { \n"
    dotText += "rankdir = \"TB\"; \n"
    dotText += "node[shape = box] \n"
    dotText += defNodo(0, "Lista_Ins")
    for (let sentencia of arbolAst) {
        dotText += graficarSentencia(0, sentencia)
    }
    dotText += "}"
    fs.writeFile('C:\\Users\\Mario\\OneDrive\\Escritorio\\USAC\\S22022\\Compi1\\p2\\OLC1_P2_201908338\\Client\\src\\Imagenes\\ast.dot', dotText, (err) => {}) 
    exec("dot -Tjpg C:\\Users\\Mario\\OneDrive\\Escritorio\\USAC\\S22022\\Compi1\\p2\\OLC1_P2_201908338\\Client\\src\\Imagenes\\ast.dot -o C:\\Users\\Mario\\OneDrive\\Escritorio\\USAC\\S22022\\Compi1\\p2\\OLC1_P2_201908338\\Client\\src\\Imagenes\\ast.jpg")
    const base64 = fs.readFileSync("C:\\Users\\Mario\\OneDrive\\Escritorio\\USAC\\S22022\\Compi1\\p2\\OLC1_P2_201908338\\Client\\src\\Imagenes\\ast.jpg", "base64");
    return base64
}

function graficarSentencia(idPadre, sentencia) {
    dotText = ""
    if (sentencia.tipo === TIPO_VALOR.ENTERO || sentencia.tipo === TIPO_VALOR.DECIMAL ||
        sentencia.tipo === TIPO_VALOR.BANDERA || sentencia.tipo === TIPO_VALOR.CARACTER ||
        sentencia.tipo === TIPO_VALOR.CADENA || sentencia.tipo === TIPO_VALOR.IDENTIFICADOR) {
        return graficarSimbolo(idPadre, sentencia)
    } 

    else if (sentencia.tipo === TIPO_OPERACION.SUMA ||sentencia.tipo === TIPO_OPERACION.RESTA ||
            sentencia.tipo === TIPO_OPERACION.MULTIPLICACION || sentencia.tipo === TIPO_OPERACION.DIVISION ||
            sentencia.tipo === TIPO_OPERACION.POTENCIA || sentencia.tipo === TIPO_OPERACION.MODULO ||
            sentencia.tipo === TIPO_OPERACION.IGUALIGUAL || sentencia.tipo === TIPO_OPERACION.NOIGUAL ||
            sentencia.tipo === TIPO_OPERACION.MENOR || sentencia.tipo === TIPO_OPERACION.MENORIGUAL || 
            sentencia.tipo === TIPO_OPERACION.MAYOR || sentencia.tipo === TIPO_OPERACION.MAYORIGUAL ||
            sentencia.tipo === TIPO_OPERACION.OR || sentencia.tipo === TIPO_OPERACION.AND) {
        return graficarNuevaOpBinaria(idPadre, sentencia)
    }
    
    else if (sentencia.tipo === TIPO_OPERACION.NOT || sentencia.tipo === TIPO_OPERACION.UMENOS) {
        return graficarNuevaOpUnaria(idPadre, sentencia)
    }

    else if (sentencia.tipo === TIPO_INSTRUCCION.EXEC) {
        return graficarExec(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.LLAMADA_FUNC_METODO) {
        return graficarLlamadaFuncMetodo(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.PRINT) {
        return graficarPrint(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.DECMETODO) {
        return graficarDecMetodo(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.DECMETODO) {
        return graficarDecMetodo(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.DECLARACION) {
        return graficarDecVar(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.ASIGNACION) {
        return graficarAsgVar(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.IF){
       return graficarIf(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.SWITCH) {
        return graficarSwitch(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.WHILE) {
        return graficarWhile(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.DOWHILE) {
        return graficarDoWhile(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.FOR) {
        return graficarFor(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.INCREMENTO || sentencia.tipo === TIPO_INSTRUCCION.DECREMENTO) {
        return graficarActualizacion(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_OPERACION.CASTEO) {
        return graficarCasteo(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.DEC_VEC_FORMA_UNO) {
        return graficarDecVecFormUno(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.DEC_VEC_FORMA_DOS) {
        return graficarDecVecFormDos(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.MODIFICAR_VECTOR) {
        return graficarModVec(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_OPERACION.ACCESO_VECTOR) {
        return graficarAccesoVec(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.DEC_LISTA) {
        return graficarDecLista(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.AGREGAR_LISTA) {
        return graficarAgregarLista(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_OPERACION.ACCESO_LISTA) {
        return graficarAccesoLista(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.MODIFICAR_LISTA) {
        return graficarModLista(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_OPERACION.FUNC_NATIVA) {
        return graficarFuncNativa(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_OPERACION.OPERADOR_TERNARIO) {
        return graficarOpTernario(idPadre, sentencia)
    } else if (sentencia.tipo === TIPO_INSTRUCCION.RETURN) {
        return graficarReturn(idPadre, sentencia)
    }
    return dotText
}

function graficarExec(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "RUN", idPadre)
    dotText += getNodo(sentencia.idSent+1, "id \n" + sentencia.id, sentencia.idSent)
    if (sentencia.listaValores.length != 0) {
        dotText += getNodo(sentencia.idSent+2, "PARAMETROS", sentencia.idSent)
        for (let sent of sentencia.listaValores) {
            dotText += graficarSentencia(sentencia.idSent+2, sent)
        }
    }
    return dotText
}


function graficarLlamadaFuncMetodo(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "LLAMADA_FUNC", idPadre)
    dotText += getNodo(sentencia.idSent+1, "id", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "LISTA_VALORES", sentencia.idSent)
    for (let sent of sentencia.listaValores) {
        dotText += graficarSentencia(sentencia.idSent+2, sent)
    }
    return dotText
}


function graficarSimbolo(idPadre, sentencia) {
    dotText = ""
    dotText += defNodo(sentencia.idSent, sentencia.valor)
    dotText += defEdge(idPadre, sentencia.idSent)
    return dotText
}

function graficarDecMetodo(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, (sentencia.tipoRetorno === null? "DEC_METODO" : "DEC_FUNCION"), idPadre)
    dotText += getNodo(sentencia.idSent+1, "Tipo Retorno \n" + (sentencia.tipoRetorno === null? "Void" : sentencia.tipoRetorno), sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "Nombre \n" + sentencia.nombre, sentencia.idSent)
    if (sentencia.listaParams.length > 0) {
        dotText += getNodo(sentencia.idSent+3, "LISTA_PARAMS", sentencia.idSent)
        cont = 4
        for (let sent of sentencia.listaParams){
            dotText += graficarSentencia(sentencia.idSent+3, sent)
        }
    }
    if (sentencia.listaIns.length > 0) {
        dotText += getNodo(sentencia.idSent+4, "LISTA_INS", sentencia.idSent)
        for (let sent of sentencia.listaIns){
            dotText += graficarSentencia(sentencia.idSent+4, sent)
        }
    }
    return dotText
}

function graficarPrint(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "IMPRIMIR", idPadre)
    dotText += graficarSentencia(sentencia.idSent, sentencia.expresion)
    return dotText
}

function graficarNuevaOpBinaria(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, sentencia.tipo, idPadre)
    dotText += graficarSentencia(sentencia.idSent, sentencia.opIzq)
    if (sentencia.opDer !== null) {
        dotText += graficarSentencia(sentencia.idSent, sentencia.opDer)
    }
    return dotText
}

function graficarNuevaOpUnaria(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, sentencia.tipo, idPadre)
    dotText += graficarSentencia(sentencia.idSent, sentencia.op)
    return dotText
}

function graficarDecVar(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "DEC_VAR", idPadre)
    dotText += getNodo(sentencia.idSent+1, "Tipo \n" + sentencia.tipo_dato, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "id \n" + sentencia.id, sentencia.idSent)
    if (sentencia.valor != null) {
        dotText += getNodo(sentencia.idSent+3, "EXPRESION", sentencia.idSent)
        dotText += graficarSentencia(sentencia.idSent+3, sentencia.valor)
    }
    return dotText
}

function graficarAsgVar(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "ASIGNAR_VAR", idPadre)
    dotText += getNodo(sentencia.idSent+1, "Id \n" + sentencia.id, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "EXPRESION", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.expresion)
    
    return dotText
}

function graficarIf(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "SENTENCIA_IF", idPadre)
    //grafica if simple
    dotText += getNodo(sentencia.ifSimple.idSent, "IF_SIMPLE", sentencia.idSent)
    dotText += getNodo(sentencia.ifSimple.idSent+1, "CONDICION", sentencia.ifSimple.idSent)
    dotText += getNodo(sentencia.ifSimple.idSent+2, "LISTA_INS", sentencia.ifSimple.idSent)
    dotText += graficarSentencia(sentencia.ifSimple.idSent+1, sentencia.ifSimple.condicion)
    for (let sent of sentencia.ifSimple.listaIns) {
        dotText += graficarSentencia(sentencia.ifSimple.idSent+2, sent)
    }
    //grfica los else if
    for (let sent of sentencia.listaElseIf) {
        dotText += getNodo(sent.idSent, "ELSE_IF", sentencia.idSent)
        dotText += getNodo(sent.idSent+1, "CONDICION", sent.idSent)
        dotText += getNodo(sent.idSent+2, "LISTA_INS", sent.idSent)
        dotText += graficarSentencia(sent.idSent+1, sent.condicion)
        for (let sent2 of sent.listaIns) {
            dotText += graficarSentencia(sent.idSent+2, sent2)
        }
    }
    //grfica el esle
    if (sentencia.listaInsElse.length > 0) {
        dotText +=  getNodo(sentencia.idSent+1, "ELSE", sentencia.idSent)
        for (let sent of sentencia.listaInsElse) {
            dotText += graficarSentencia(sentencia.idSent+1, sent)
        }
    }

    return dotText
}

function graficarSwitch(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "SWITCH", idPadre)
    dotText += getNodo(sentencia.idSent+1, "EXPRESION", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "SWITCH_CUERPO", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+1, sentencia.expresion)
    for (let sent of sentencia.switchCuerpo.caseList) {
        dotText += getNodo(sent.idSent, "CASE", sentencia.idSent+2)
        dotText += getNodo(sent.idSent+1, "EXPRESION", sent.idSent)
        dotText += graficarSentencia(sent.idSent+1, sent.expCase)
        for (let sent2 of sent.caseListIns) {
            dotText += graficarSentencia(sent.idSent, sent2)
        }
    }
    if (sentencia.switchCuerpo.defaultListIns.length != 0) {
        dotText += getNodo(sentencia.idSent+3, "Default", sentencia.idSent+2)
    }
    for (let sent of sentencia.switchCuerpo.defaultListIns) {
        dotText += graficarSentencia(sentencia.idSent+3, sent)
    }
    return dotText
}

function graficarWhile(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "WHILE", idPadre)
    dotText += getNodo(sentencia.idSent+1, "CONDICION", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "LISTA_INS", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+1, sentencia.condicion)
    for (let sent of sentencia.listaIns) {
        dotText += graficarSentencia(sentencia.idSent+2, sent)
    }
    return dotText
}

function graficarDoWhile(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "DO_WHILE", idPadre)
    dotText += getNodo(sentencia.idSent+1, "LISTA_INS", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "CONDICION", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2,  sentencia.condicion)
    for (let sent of  sentencia.listaIns) {
        dotText += graficarSentencia(sentencia.idSent+1, sent)
    }
    return dotText
}

function graficarFor(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "FOR", idPadre)   
    dotText += graficarSentencia(sentencia.idSent, sentencia.iniFor)
    dotText += getNodo(sentencia.idSent+2, "CONDICION", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+3, "ACTUALIZACION", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+4, "LISTA_INS", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.condicionFor)
    dotText += graficarSentencia(sentencia.idSent+3, sentencia.actualizacion)
    for (let sent of sentencia.listaInsFor) {
        dotText += graficarSentencia(sentencia.idSent+4, sent)
    }
    return dotText
}

function graficarActualizacion(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, sentencia.tipo + "\n" + sentencia.id, idPadre)   
    return dotText
}

function graficarCasteo(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "CASTEO", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Tipo Deseado \n" +  sentencia.tipoDeseado, sentencia.idSent)  
    dotText += getNodo(sentencia.idSent+2, "Expresion", sentencia.idSent) 
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.expresion)
    return dotText
}

function graficarDecVecFormUno(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "DEC_VECTOR", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Tipo_Vec \n" + sentencia.tipoVector, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "Id_Vev \n" + sentencia.idVector, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+3, "EXP_LONGITUD", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+3, sentencia.expLongitud)
    return dotText
}

function graficarDecVecFormDos(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "DEC_VECTOR", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Tipo_Vec \n" + sentencia.tipoVector, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "Id_Vev \n" + sentencia.idVector, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+3, "ELEMENTOS", sentencia.idSent)
    for (let sent of sentencia.listaValores) {
        dotText += graficarSentencia(sentencia.idSent+3, sent)
    }
    return dotText
}

function graficarModVec(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "MOD_VECTOR", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Id_Vev \n" + sentencia.idVector, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "EXP_INDICE", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+3, "EXP_VALOR", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.indiceExp)
    dotText += graficarSentencia(sentencia.idSent+3, sentencia.valorExp)
    return dotText
}

function graficarAccesoVec(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "ACCESO_VEC", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Id_Vev \n" + sentencia.idVector, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "EXP_INDICE", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.indiceExp)
    return dotText
}

function graficarDecLista(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "DEC_LISTA", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Tipo \n" + sentencia.tipoLista, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "Id_Lista \n" + sentencia.idLista, sentencia.idSent)
    return dotText
}

function graficarAgregarLista(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "AGREGAR_LISTA", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Id_Lista \n" + sentencia.idLista, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "EXP_VALOR", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.expValor)

    return dotText
}

function graficarAccesoLista(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "ACCESO_LISTA", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Id_Lista \n" + sentencia.idLista, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "EXP_INDICE", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.expIndice)
    return dotText
}

function graficarModLista(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "MOD_LISTA", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "Id_Lista \n" + sentencia.idLista, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "EXP_INDICE", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+3, "EXP_VALOR", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.expIndice)
    dotText += graficarSentencia(sentencia.idSent+3, sentencia.expValor)
    return dotText
}

function graficarFuncNativa(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "FUNC_NATIVA", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "TIPO_FUNC \n" + sentencia.tipoFunc, sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "EXPRESION", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.exp)
    return dotText
}


function graficarOpTernario(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "OP_TERNARIO", idPadre)  
    dotText += getNodo(sentencia.idSent+1, "CONDICON", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "EXPRESION_1", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+3, "EXPRESION_2", sentencia.idSent)
    dotText += graficarSentencia(sentencia.idSent+1, sentencia.expCondicion)
    dotText += graficarSentencia(sentencia.idSent+2, sentencia.expUno)
    dotText += graficarSentencia(sentencia.idSent+3, sentencia.expDos)
    return dotText
}

function graficarReturn(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, "RETURN", idPadre)  
    if (sentencia.expReturn !== null) {
        dotText += graficarSentencia(sentencia.idSent, sentencia.expReturn)
    }
    return dotText
}
