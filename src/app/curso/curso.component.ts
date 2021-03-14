import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CursoService } from '../curso.service';
import { Categoria } from './categoria';
import { Curso } from './curso';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private service: CursoService, public datepipe: DatePipe, private fb: FormBuilder, private snackBar: MatSnackBar
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
    }, errorResponse => {
      this.snackBar.open(errorResponse.error.errors, "Undo!", {
        duration: 2000
      });
    });
  }

  listarCursos() {
    this.service.listarCurso().subscribe(response => {
      this.cursos = response;
    }, errorResponse => {
      this.snackBar.open(errorResponse.error.errors, "Undo!", {
        duration: 2000
      });
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
      }, errorResponse => {
        this.snackBar.open(errorResponse.error.errors, "Undo!", {
          duration: 2000
        });
      });
    } else {
      this.service.alterar(formValues.id, curso).subscribe(response => {
        const cursoIndex = this.cursos.findIndex(
          (curso) => curso.id === response.id
        );
        this.cursos[cursoIndex] = response;
      }, errorResponse => {
        this.snackBar.open(errorResponse.error.errors, "Undo!", {
          duration: 2000
        });
      });
    }

    this.snackBar.open("Curso salvo com sucesso", "Sucesso!", {
      duration: 2000
    });

    this.limparCampos();
  }


  pesquisarCursoPorDescricao(event: any) {
    this.descricaoCurso = event.target.value;

    this.service.pesquisarCursoPorDescricao(this.descricaoCurso).subscribe(response => {
      this.cursos = response;
    }, errorResponse => {
      this.snackBar.open(errorResponse.error.errors, "Undo!", {
        duration: 2000
      });
    });
  }

  deletar(curso: Curso) {
    this.service.deletar(curso.id).subscribe();
    this.cursos = this.cursos.filter(cursoFilter => cursoFilter.id !== curso.id);
    this.snackBar.open("Curso deletado com sucesso", "Undo!", {
      duration: 2000
    });
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
