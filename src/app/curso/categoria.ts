export class Categoria {
  codigo: number;
  descricao: string | undefined;

  constructor(codigo: number, descricao?: string) {
    this.codigo = codigo;
    this.descricao = descricao;
  }
}
