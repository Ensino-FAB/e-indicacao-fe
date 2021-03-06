import { IndicacaoResponse } from './../models/indicacao.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Indicacao} from '../models/indicacao.model';
import {IndicacaoSearchModel} from '../models/indicacao-search.model';
import {Pageable} from '../core/models/pageable.model';
import {take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IndicacaoService {
  constructor(protected http: HttpClient) {
  }

  private endpoint = `${environment.CURSOS_INDICACAO_API}/indicacao`;

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

  findById(id: number): Observable<Indicacao> {
    return this.http.get<any>(
      `${environment.CURSOS_INDICACAO_API}/indicacao/${id}`
    );
  }

  findAll(search: IndicacaoSearchModel): Observable<Pageable<Indicacao>> {
    this.removeEmptyFields(search);
    const params = new HttpParams({fromObject: search});
    return this.http.get<any>(this.endpoint, {
      params,
    });
  }

  findAllIndicacoesByEvento(search: IndicacaoSearchModel, idEvento: number): Observable<IndicacaoResponse[]> {
    this.removeEmptyFields(search);
    const params = new HttpParams({fromObject: search});
    return this.http.get<any[]>(`${environment.CURSOS_INDICACAO_API}/indicacao/evento/${idEvento}` , {params});
  }

  // tslint:disable-next-line:typedef
  find(id: number) {
    return this.http.get<Indicacao>(`${this.endpoint}/${id}`).pipe(take(1));
  }

  create(record: Indicacao, idEvento: number): Observable<Indicacao> {
    return this.http.post(`${this.endpoint}/cadastro/evento/${idEvento}`, record).pipe(take(1)) as Observable<Indicacao>;
  }

  // tslint:disable-next-line:typedef
  update(data: Indicacao) {
    return this.http
      .put<Indicacao>(`${this.endpoint}/${data.id}`, data)
      .pipe(take(1));
  }

  save(record: Indicacao, idEvento: number): any {
    return this.create(record, idEvento);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
