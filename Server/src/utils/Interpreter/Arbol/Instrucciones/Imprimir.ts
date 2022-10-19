import { Instruccion } from '../abstract/Instruccion';
import Errores from '../Exceptions/Error';
import Three from '../Simbolos/Arbol';
import SymbolTable from '../Simbolos/TablaSimbolos';
import Tipo, { TipoDato } from '../Simbolos/Tipo';

export default class Imprimir extends Instruccion {
  private expresion: Instruccion;

  constructor(expresion: Instruccion, linea: number, columna: number) {
    super(new Tipo(TipoDato.INDEFINIDO), linea, columna);
    this.expresion = expresion;
  }

  public interpretar(arbol: Three, tabla: SymbolTable) {
    let valor = this.expresion.interpretar(arbol, tabla);
    if (valor instanceof Errores) return valor;
    arbol.actualizaConsola(valor + '');
  }
}