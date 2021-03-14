import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CursoService } from '../curso.service';
import { Categoria } from './categoria';
import { Curso } from './curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  formulario!: FormGroup;
  categorias: Categoria[] = [];
  cursos: Curso[] = [];
  colunas = ["id", "descricao", "dataInicio", "dataTermino", "quantidadeAlunosPorTurma", "categoria", "excluir"];
  descricaoCurso: string = "";
  selectedIndex: number = 0;

  constructor(
    private service: CursoService, public datepipe: DatePipe, private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarCategoria();
    this.listarCursos();

  }

  montarFormulario() {
    this.formulario = this.fb.group({
      id: [],
      descricao: ['', [Validators.required,
      Validators.maxLength(300)]],
      dataInicio: ['', Validators.required],
      dataTermino: ['', Validators.required],
      quantidadeAlunosPorTurma: [''],
      categoria: ['', Validators.required],
    })
  }

  listarCategoria() {
    this.service.listarCategoria().subscribe(response => {
      this.categorias = response;
    });
  }

  listarCursos() {
    this.service.listarCurso().subscribe(response => {
      this.cursos = response;
    });
  }

  submit() {
    const formValues = this.formulario.value;

    const dataInicio = this.datepipe.transform(formValues.dataInicio, 'yyyy-MM-dd HH:mm:ss') ?? "";
    const dataTermino = this.datepipe.transform(formValues.dataTermino, 'yyyy-MM-dd HH:mm:ss') ?? "";

    const categoria: Categoria = new Categoria(formValues.categoria);
    const curso: Curso = new Curso(formValues.descricao, dataInicio, dataTermino, formValues.quantidadeAlunosPorTurma, categoria);

    if (formValues.id == null) {
      this.service.incluir(curso).subscribe(response => {
        this.cursos = [...this.cursos, response];
      })
    } else {
      this.service.alterar(formValues.id, curso).subscribe(response => {
        const cursoIndex = this.cursos.findIndex(
          (curso) => curso.id === response.id
        );

        this.cursos[cursoIndex] = response;
      })
    }

    this.limparCampos();
    this.selectedIndex = 0;
  }


  pesquisarCursoPorDescricao(event: any) {
    this.descricaoCurso = event.target.value;

    this.service.pesquisarCursoPorDescricao(this.descricaoCurso).subscribe(response => {
      this.cursos = response;
    })
  }

  deletar(curso: Curso) {
    this.service.deletar(curso.id).subscribe();
    this.cursos = this.cursos.filter(cursoFilter => cursoFilter.id !== curso.id);
  }

  selecionarCurso(curso: Curso) {
    this.formulario.setValue({
      id: curso.id,
      descricao: curso.descricao,
      dataInicio: curso.dataInicio,
      dataTermino: curso.dataTermino,
      quantidadeAlunosPorTurma: curso.quantidadeAlunosPorTurma,
      categoria: curso.categoria.codigo,
    })
  }

  limparCampos() {
    this.formulario.reset();
  }
}
