"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstract/Instruccion");
const Tipo_1 = __importStar(require("../Simbolos/Tipo"));
const Aritmetica_1 = require("./Aritmetica");
class Aritmetica extends Instruccion_1.Instruccion {
    constructor(tipo, OpIzq, opDer, fila, columna) {
        super(new Tipo_1.default(Tipo_1.TipoDato.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.operacionIzq = OpIzq;
        this.operacionDer = opDer;
    }
    interpretar(arbol, tabla) {
        if (this.tipo == Aritmetica_1.tipoOp.SUMA) {
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if (this.operacionIzq.tipoDato.getTipo() === Tipo_1.TipoDato.ENTERO) {
                if (this.operacionDer.tipoDato.getTipo() === Tipo_1.TipoDato.ENTERO) {
                    return Number(valueIzq) + Number(valueDer);
                }
            }
        }
        this.tipoDato.setTipo(Tipo_1.TipoDato.ENTERO);
        return null;
    }
}
exports.default = Aritmetica;
