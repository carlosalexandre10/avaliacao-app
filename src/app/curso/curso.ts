import { Categoria } from "./categoria";

export class Curso {
  id!: number;
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  quantidadeAlunosPorTurma: number;
  categoria: Categoria;

  constructor(descricao: string, dataInicio: string, dataTermino: string, quantidadeAlunosPorTurma: number, categoria: Categoria) {
    this.descricao = descricao;
    this.dataInicio = dataInicio;
    this.dataTermino = dataTermino;
    this.quantidadeAlunosPorTurma = quantidadeAlunosPorTurma;
    this.categoria = categoria;
  }
}



