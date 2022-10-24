"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.listaErrores = void 0;
const Instruccion_1 = require("../../utils/Interpreter/Arbol/abstract/Instruccion");
const Error_1 = __importDefault(require("../../utils/Interpreter/Arbol/Exceptions/Error"));
const Arbol_1 = __importDefault(require("../../utils/Interpreter/Arbol/Simbolos/Arbol"));
const TablaSimbolos_1 = __importDefault(require("../../utils/Interpreter/Arbol/Simbolos/TablaSimbolos"));
exports.listaErrores = [];
const parse = (req, res) => {
    exports.listaErrores = new Array();
    let parser = require('../../utils/Interpreter/Arbol/analizador');
    const { peticion } = req.body;
    try {
        let ast = new Arbol_1.default(parser.parse(peticion));
        var tabla = new TablaSimbolos_1.default();
        ast.settablaGlobal(tabla);
        for (let i of ast.getinstrucciones()) {
            if (i instanceof Error_1.default) {
                exports.listaErrores.push(i);
                ast.actualizaConsola(i.returnError());
            }
            var resultador = i instanceof Instruccion_1.Instruccion ? i.interpretar(ast, tabla) : new Error_1.default("SEMANATICO", "La ejecucion no se pudo ejecutar", 0, 0);
            if (resultador instanceof Error_1.default) {
                exports.listaErrores.push(resultador);
                ast.actualizaConsola(resultador.returnError());
            }
        }
        res.json({ consola: ast.getconsola(), errores: exports.listaErrores, simbolos: [] });
    }
    catch (err) {
        console.log(err);
        res.json({ consola: '', error: err, errores: exports.listaErrores, simbolos: [] });
    }
};
exports.parse = parse;
