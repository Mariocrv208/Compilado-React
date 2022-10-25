let reporteTablaSimbolos = require("../ReporteTablaSimbolos/reporteTablaSimbolos")
const TIPO_SIMBOLO = require("../Tipos/TipoSimbolo")

class FilaTablaSimbolos {
    constructor(identificador, tipoSimbolo, tipoVar, entorno, linea, columna) {
        this.identificador = identificador
        this.tipoSimbolo = tipoSimbolo
        this.tipoVar = tipoVar
        this.entorno = entorno
        this.linea = linea
        this.columna = columna
    }
}

function getEntornoString(ambitoActual) {
    let listaEntornos = []
    e = ambitoActual
    while (e != null) {
        listaEntornos.push(e.nombre)
        e = e.anterior
    }
    listaEntornos.reverse()
    return  (listaEntornos.length > 0)? listaEntornos.join("_") : listaEntornos.join("")
}


class Ambito {
    constructor(_anterior, _nombre) {
        this.anterior = _anterior
        this.nombre = _nombre 
        this.tablaSimbolos = new Map()
        this.tablaMetodos = new Map()
    }

    addSimbolo(_id, _simbolo) {  
        this.tablaSimbolos.set(_id.toLowerCase(), _simbolo)
        let filaTabla = new FilaTablaSimbolos (
            _id.toLowerCase(),
            "Dato",
           _simbolo.tipo,
           getEntornoString(this),
            _simbolo.linea,
            _simbolo.columna
        )
        reporteTablaSimbolos.tablaSimbolos.push(filaTabla)
    }

    addMetodo(_s, _metodo){
        this.tablaMetodos.set(_s.toLowerCase(), _metodo)
        let filaTabla = new FilaTablaSimbolos (
            _s.toLowerCase(),
            (_metodo.tipoRetorno === null)? TIPO_SIMBOLO.METODO: TIPO_SIMBOLO.FUNCION,
            (_metodo.tipoRetorno === null)? "void": _metodo.tipoRetorno,
           getEntornoString(this),
           _metodo.linea,
           _metodo.columna
        )
        reporteTablaSimbolos.tablaSimbolos.push(filaTabla)
    }

    getSimbolo(_id){ 
        for(let ambito = this; ambito != null; ambito = ambito.anterior){
            var encontrado = ambito.tablaSimbolos.get(_id.toLowerCase()) //hola<=>HoLA
            if(encontrado != null){
                return encontrado
            }
        }
        return null
    }

    getMetodo(_id) { //(hola, clase simbolo)
        for(let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_id.toLowerCase()) 
            if(encontrado!=null){
                return encontrado
            }
        }
        return null
    }

    existeSimbolo(_id){
        for(let ambito = this; ambito != null; ambito = ambito.anterior){
            var encontrado = ambito.tablaSimbolos.get(_id.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){
                return true
            }
        }
        return false
    }

    existeSimboloAmbitoActual(_id){
        var encontrado = this.tablaSimbolos.get(_id.toLowerCase()) //hola<=>HoLA
        if(encontrado!=null){
            return true
        }
        return false
    }

    existeMetodo(_id){
        for(let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_id.toLowerCase())
            if(encontrado != null){
                return true
            }
        }
        return false
    }

    actualizar(_id, _simbolo){
        for(let ambito = this; ambito != null; ambito = ambito.anterior){
            var encontrado = ambito.tablaSimbolos.get(_id.toLowerCase());
            if(encontrado!=null){
                ambito.tablaSimbolos.set(_id, _simbolo)
                return true;
            }
        }
        return false
    }

}

module.exports = Ambito