import { Instruccion } from '../abstract/Instruccion';
import Arbol from '../Simbolos/Arbol';
import tablaSimbolo from '../Simbolos/TablaSimbolos';
import Tipo, {TipoDato} from '../Simbolos/Tipo';

export default class Aritmetico extends Instruccion {
  operacionIzq: Instruccion;
  operacionDer: Instruccion;
  tipo: tipoOp;
  

  constructor(tipo: tipoOp, opIzq: Instruccion, opDer: Instruccion, fila: number, columna: number) {
    super(new Tipo(TipoDato.INDEFINIDO), fila, columna);
    this.tipo = tipo;
    this.operacionIzq = opIzq;
    this.operacionDer = opDer;
  }

  interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.tipo===tipoOp.SUMA){
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionIzq.tipoDato.getTipo() === TipoDato.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() === TipoDato.ENTERO){
                    this.tipoDato.setTipo(TipoDato.ENTERO);
                    return (Number(valueIzq)+Number(valueDer));
                }else if(this.operacionDer.tipoDato.getTipo() === TipoDato.CADENA){
                    this.tipoDato.setTipo(TipoDato.CADENA);
                    return (`${valueIzq.toString()}${valueDer.toString()}`);
                }
            }
        } else if(this.tipo===tipoOp.RESTA){    
            let valueIzq = this.operacionIzq.interpretar(arbol, tabla);
            let valueDer = this.operacionDer.interpretar(arbol, tabla);
            if(this.operacionIzq.tipoDato.getTipo() === TipoDato.ENTERO){
                if(this.operacionDer.tipoDato.getTipo() === TipoDato.ENTERO){
                    return (Number(valueIzq)-Number(valueDer));
                }
            }
        } 
        return null;
  }
}

export enum tipoOp{
    SUMA,
    RESTA,
    DIVISION,
    MULTIPLICACION
}