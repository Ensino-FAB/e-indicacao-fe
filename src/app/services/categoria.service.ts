import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Categoria} from "../models/categoria.model";
import {Pageable} from "../core/models/pageable.model";

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {
  constructor(protected http: HttpClient) {}

  private endpoint = `${environment.CURSOS_INDICACAO_API}/categoria`;

  removeEmptyFields(data): void {
    Object.keys(data).forEach(
      (key) =>
        (data[key] === null ||
          data[key] === '' ||
          data[key] === undefined ||
          data[key].length === 0) &&
        delete data[key]
    );
  }

  findById(id: number): Observable<Categoria> {
    return this.http.get<any>(`${this.endpoint}/${id}`);
  }

  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.endpoint}`);
  }

  find(id: number) {
    return this.http
      .get<Categoria>(`${this.endpoint}/${id}`)
      .pipe(take(1));
  }

  create(data: Categoria): Observable<Categoria> {
    return this.http
      .post<Categoria>(this.endpoint, data)
      .pipe(take(1));
  }

  update(data: Categoria) {
    return this.http
      .put<Categoria>(`${this.endpoint}/${data.id}`, data)
      .pipe(take(1));
  }

  save(data: Categoria): any {
    if (data.id) {
      return this.update(data);
    }
    return this.create(data);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
