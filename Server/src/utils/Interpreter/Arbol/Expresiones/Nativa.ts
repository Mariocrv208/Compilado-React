import { Instruccion } from '../abstract/Instruccion';
import Arbol from '../Simbolos/Arbol';
import TablaSimbolo from '../Simbolos/TablaSimbolos';
import Tipo, { TipoDato } from '../Simbolos/Tipo';
import get from 'lodash/get';

export default class Nativa extends Instruccion {
  valor: any;

  constructor(tipo: Tipo, valor: any, fila: number, columna: number) {
    super(tipo, fila, columna);
    this.valor = valor;
  }

  interpretar(arbol: Arbol, tabla: TablaSimbolo) {
    if(this.tipoDato.getTipo() === TipoDato.ENTERO){
        return this.valor;
    }else if(this.tipoDato.getTipo() === TipoDato.CADENA){
        return this.valor.toString();
    }else if(this.tipoDato.getTipo() === TipoDato.IDENTIFICADOR){
      let value = tabla.getValor(this.valor)
      this.tipoDato = get(value, 'tipo', new Tipo(TipoDato.INDEFINIDO));
      return get(value, 'valor')
    }    
  }
}