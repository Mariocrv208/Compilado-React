'use strict'
const Ambito = require("./Controlador/Entorno/Ambito")
const ejecutarAmbitoGlobal = require("./Controlador/Instrucciones/ejecutarAmbitoGlobal")
const express = require('express')
const bodParser = require('body-parser')
let cors = require('cors')
const app = express()
const parser = require('./parser')
const fs = require('fs')
const graficarAst = require("./Controlador/Graficas/graficarAst")
let reporteTablaSimbolos = require("./Controlador/ReporteTablaSimbolos/reporteTablaSimbolos")
const _ = require("lodash");    
let pila = require("./Controlador/Instrucciones/pila")

app.use(bodParser.json({limit:'50mb', extended:true}))
app.use(bodParser.urlencoded({limit:'50mb', extended:true}))
app.use(cors())

app.listen('5001', () => {
    console.log("Servidor en puerto 5001")
})

app.post('/analizar', (req, res) => {
    pila.resultados = new Map()
    reporteTablaSimbolos.tablaSimbolos = []
    let resAnalisSintactico = parser.parse(req.body.codigo)
    var resultadoAnalis
    if (resAnalisSintactico.errorSintactico === "") {
        var arbolAst = resAnalisSintactico.listaIns
        var respuesta = ejecutarAmbitoGlobal(arbolAst, new Ambito(null, "Global"))
        var unicos = []
    
        for (let element of reporteTablaSimbolos.tablaSimbolos) {
            var cont  = 0
            for (let elem of unicos) {
                if (element.identificador === elem.identificador && 
                    element.entorno === elem.entorno) {
                    cont += 1
                    if (cont > 0) {
                        break
                    }
                }
            }
            if (cont === 0) {
                unicos.push(element)
            }
        }
        var resultadoAnalis = {
            arbol: arbolAst,
            consola: respuesta,
            tablaSimbolos: unicos,
            astBase64: graficarAst(arbolAst),
        }
    } else {
        var resultadoAnalis = {
            arbol: [],
            consola: resAnalisSintactico.errorSintactico,
            tablaSimbolos: [],
            astBase64: '',
        }
    }
    res.send(resultadoAnalis)
})