import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Categoria} from '../models/categoria.model';
import {Pageable} from '../core/models/pageable.model';
import {CategoriaSearchModel} from '../models/categoria-search.model';

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {
  constructor(protected http: HttpClient) {
  }

  private endpoint = `${environment.CURSOS_INDICACAO_API}/categoria`;

  removeEmptyFields(data): void {
    if(!data){
      return;
    }

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
    return this.http.get<any>(
      `${environment.CURSOS_INDICACAO_API}/categoria/${id}`
    );
  }

  findAll(search: CategoriaSearchModel): Observable<Pageable<Categoria>> {
    this.removeEmptyFields(search);
    const params = new HttpParams({fromObject: search});
    return this.http.get<any>(this.endpoint, {
      params,
    });
  }

  // tslint:disable-next-line:typedef
  find(id: number) {
    return this.http.get<Categoria>(`${this.endpoint}/${id}`).pipe(take(1));
  }

  create(record: Categoria): Observable<Categoria> {
    return this.http.post(this.endpoint, record).pipe(take(1)) as Observable<Categoria>;
  }

  // tslint:disable-next-line:typedef
  update(id: number, record: Categoria) {
    return this.http.put(`${this.endpoint}`, record).pipe(take(1));
  }

  save(record: Categoria): any {
    if (record.id) {
      return this.update(record.id, record);
    }
    return this.create(record);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
