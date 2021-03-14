import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from './curso/categoria';
import { Curso } from './curso/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  url: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  listarCurso(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/cursos`);
  }

  pesquisarCursoPorDescricao(descricao: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/cursos/descricao/${descricao}`);
  }

  incluir(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.url}/cursos`, curso);
  }

  alterar(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.url}/cursos/${id}`, curso);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/cursos/${id}`);
  }

  listarCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/categorias`);
  }
}
