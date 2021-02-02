import { PropostaSearchModel } from './../models/proposta-search.model';
import { take } from 'rxjs/operators';
import { PropostaRequest, PropostaResponse } from './../models/proposta.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from '../core/models/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(protected http: HttpClient) { }

  private endpoint = `${environment.CURSOS_INDICACAO_API}/proposta`;

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

  create(record: PropostaRequest): Observable<PropostaRequest> {
    return this.http.post(this.endpoint, record).pipe(take(1)) as Observable<PropostaRequest>;
  }

  findAll(search: PropostaSearchModel): Observable<Pageable<PropostaResponse>> {
    this.removeEmptyFields(search);
    const params = new HttpParams({fromObject: search});
    return this.http.get<any>(this.endpoint, { params });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
