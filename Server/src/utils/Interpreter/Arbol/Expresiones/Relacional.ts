import { Instruccion } from "../abstract/Instruccion";
import Arbol from "../Simbolos/Arbol";
import TablaSimbolos from "../Simbolos/TablaSimbolos";
import Tipo,{TipoDato} from "../Simbolos/Tipo";
import { tipoOp } from "./Aritmetica";

export default class Aritmetica extends Instruccion{
    operacionIzq: Instruccion;
    operacionDer: Instruccion;
    tipo: tipoOp;

    constructor(tipo:tipoOp, OpIzq: Instruccion, opDer: Instruccion, fila:number, columna:number){
        super(new Tipo(TipoDato.INDEFINIDO), fila, columna);
        this.tipo = tipo;
        this.operacionIzq = OpIzq;
        this.operacionDer = opDer;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos) {
        if(this.tipo == tipoOp.SUMA){
            let valueIzq = this.operacionIzq.interpretar(arbol,tabla);
            let valueDer = this.operacionDer.interpretar(arbol,tabla);

            if(this.operacionIzq.tipoDato.getTipo()===TipoDato.ENTERO){
                if(this.operacionDer.tipoDato.getTipo()=== TipoDato.ENTERO){
                    return Number(valueIzq)+Number(valueDer);
                }
            }
        }
        this.tipoDato.setTipo(TipoDato.ENTERO);
        return null;
    }


}
