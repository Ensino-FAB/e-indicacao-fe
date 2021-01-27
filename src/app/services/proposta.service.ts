import { take } from 'rxjs/operators';
import { Proposta } from './../models/proposta.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  create(record: Proposta): Observable<Proposta> {
    return this.http.post(this.endpoint, record).pipe(take(1)) as Observable<Proposta>;
  }
}
