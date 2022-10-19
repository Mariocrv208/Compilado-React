import Simbolo from './Simbolos';

export default class TablaSimbolos {
  private tablaAnterior: TablaSimbolos | any;
  private tablaActual: Map<String, Simbolo>;

  constructor(anterior?: TablaSimbolos) {
    this.tablaAnterior = anterior;
    this.tablaActual = new Map<String, Simbolo>();
  }

  public getValor(id: String): any{
    let valor = this.tablaActual.get(id);
    return valor;
  }

  public setValor(id: String, valor: Simbolo): any{
    this.tablaActual.set(id, valor);
    return null;
  }

  public getAnterior() {
    return this.tablaAnterior;
  }
  public setAnterior(anterior: TablaSimbolos) {
    this.tablaAnterior = anterior;
  }
  public getTabla() {
    return this.tablaActual;
  }
  public setTabla(Tabla: Map<String, Simbolo>) {
    this.tablaActual = Tabla;
  }
}