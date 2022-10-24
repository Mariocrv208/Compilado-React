import { Instruccion } from "../abstract/Instruccion";
import Arbol from '../Simbolos/Arbol';
import Simbolos from "../Simbolos/Simbolos";
import TablaSimbolos from "../Simbolos/TablaSimbolos";
import Tipo, { TipoDato } from "../Simbolos/Tipo";

export default class Declaracion extends Instruccion{
    private id: String;
    private tipo: Tipo;
    private valor: Instruccion;

    constructor(id: String, tipo:Tipo, valor:Instruccion, linea:number, columna: number){
        super(new Tipo(TipoDato.INDEFINIDO), linea, columna);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }

    public interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        tabla.setValor(this.id, new Simbolos(this.tipo, this.id, this.valor.interpretar(arbol,tabla)));
        return null;
    }

}

