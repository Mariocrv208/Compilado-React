"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDato = void 0;
class Tipo {
    constructor(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
exports.default = Tipo;
var TipoDato;
(function (TipoDato) {
    TipoDato[TipoDato["ENTERO"] = 0] = "ENTERO";
    TipoDato[TipoDato["CADENA"] = 1] = "CADENA";
    TipoDato[TipoDato["BOOLEAN"] = 2] = "BOOLEAN";
    TipoDato[TipoDato["DECIMAL"] = 3] = "DECIMAL";
    TipoDato[TipoDato["IDENTIFICADOR"] = 4] = "IDENTIFICADOR";
    TipoDato[TipoDato["INDEFINIDO"] = 5] = "INDEFINIDO";
})(TipoDato = exports.TipoDato || (exports.TipoDato = {}));
