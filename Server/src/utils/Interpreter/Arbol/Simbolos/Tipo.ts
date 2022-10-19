export default class Tipo {
    private tipo: TipoDato;
  
    constructor(tipo: TipoDato) {
      this.tipo = tipo;
    }
    public getTipo(): TipoDato {
      return this.tipo;
    }
    public setTipo(tipo: TipoDato): void {
      this.tipo = tipo;
    }
}
  
export enum TipoDato {
    ENTERO,
    CADENA,
    BOOLEAN,
    DECIMAL,
    IDENTIFICADOR,
    INDEFINIDO
}