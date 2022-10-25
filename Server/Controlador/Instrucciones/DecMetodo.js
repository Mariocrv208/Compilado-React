module.exports = DecMetodo
const Ambito = require("../Entorno/Ambito")
const Metodo = require("../Entorno/Metodo")
const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion")
const ejecutarBloqueIns = require("./ejecutarBloqueIns")

function DecMetodo(_instruccion, _ambito){
    const nuevoMetodo = new Metodo(_instruccion.tipoRetorno, _instruccion.nombre,  _instruccion.listaParams, _instruccion.listaIns, _instruccion.linea, _instruccion.columna)
    //verificamos si el nombre ya existe como simbolo
    if(_ambito.existeSimbolo(nuevoMetodo.nombre)){
        return `Error: No se puede declarar un metodo con el mismo nombre \n de una variable '${nuevoMetodo.nombre}'... Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    }
    //verificamos si el metodo ya existe
    else if(_ambito.existeMetodo(nuevoMetodo.nombre)){
        return `Error: El método '${nuevoMetodo.nombre}' ya existe... Linea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}`
    }
    //de lo contrario vamos a guardarlo
    _ambito.addMetodo(nuevoMetodo.nombre, nuevoMetodo)
    
    return ""
}