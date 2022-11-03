const ejecutarBloqueIns = require("./ejecutarBloqueIns");
const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion")
const DecMetodo = require("./DecMetodo")
const Declaracion = require("./Declaracion")

function ejecutarAmbitoGlobal(listaInstrucciones, ambito){
    var textoConsola = ""

    //1ERA PASADA VAMOS VERIFICAR DE QUE SOLO VENGA 1 EXEC
    let contadorExec = 0;
    for (let i = 0; i < listaInstrucciones.length; i++) {
        if (listaInstrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
            contadorExec++;
        }
    }
    if (contadorExec === 0) {
        return 'Error: No se ha detectado la sentencia RUN'
    }
    else if(contadorExec > 1) {
        return 'Error: Se ha detectado más de un RUN'
    }

    //2DA PASADA VAMOS A DECLARAR VARIABLES, METODOS Y ASIGNAR VALORES
    for(let i = 0; i < listaInstrucciones.length; i++) {
        if(listaInstrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(listaInstrucciones[i], ambito)
            if(mensaje!=null){
                textoConsola+=mensaje+'\n'
            }
        }
        else if(listaInstrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION){
            console.log(listaInstrucciones[i])
            console.log(ambito)
            var mensaje = Asignacion(listaInstrucciones[i], ambito)
            if(mensaje!=null){
                textoConsola += mensaje
            }
        }
        else if(listaInstrucciones[i].tipo === TIPO_INSTRUCCION.DECMETODO){
            var mensaje = DecMetodo(listaInstrucciones[i], ambito)
            if(mensaje!=null){
                textoConsola+=mensaje
            }
        }
        else if(listaInstrucciones[i].tipo === TIPO_INSTRUCCION.DEC_VEC_FORMA_UNO || 
            listaInstrucciones[i].tipo === TIPO_INSTRUCCION.DEC_VEC_FORMA_DOS ||
            listaInstrucciones[i].tipo === TIPO_INSTRUCCION.MODIFICAR_VECTOR ||
            listaInstrucciones[i].tipo === TIPO_INSTRUCCION.DEC_LISTA || 
            listaInstrucciones[i].tipo === TIPO_INSTRUCCION.DEC_LISTA_FORMA_2 || 
            listaInstrucciones[i].tipo === TIPO_INSTRUCCION.MODIFICAR_LISTA){
            var mensaje = ejecutarBloqueIns([listaInstrucciones[i]], ambito).textoConsola
            if(mensaje!=null){
                textoConsola+=mensaje
            }
        }
    }

    //3ERA PASADA VAMOS A BUSCAR EL EXEC QUE VAMOS EJECUTAR
    for(let i=0; i<listaInstrucciones.length; i++){
        if(listaInstrucciones[i].tipo === TIPO_INSTRUCCION.EXEC){
            var mensaje = ejecutarBloqueIns([listaInstrucciones[i]], ambito).textoConsola
            if(mensaje!=null){
                textoConsola+=mensaje
            }
            break
        }
    }
    
    return textoConsola
}

module.exports = ejecutarAmbitoGlobal