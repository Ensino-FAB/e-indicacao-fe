import { Organizacao } from 'src/app/models/organizacao.model';
import { OrganizacaoSearchModel } from './../models/organizacao-search.model';
import {PropostaSearchModel} from './../models/proposta-search.model';
import {take} from 'rxjs/operators';
import {PropostaRequest, PropostaResponse} from './../models/proposta.model';
import {environment} from './../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pageable} from '../core/models/pageable.model';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(protected http: HttpClient) {
  }

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

  create(record: PropostaRequest): Observable<PropostaResponse> {
    return this.http.post(this.endpoint, record).pipe(take(1)) as Observable<PropostaResponse>;
  }

  update(proposta: PropostaRequest): Observable<any> {
    return this.http.put(this.endpoint, proposta);
  }

  findAll(search: PropostaSearchModel): Observable<Pageable<PropostaResponse>> {
    this.removeEmptyFields(search);
    const params = new HttpParams({fromObject: search});
    return this.http.get<any>(this.endpoint, {params});
  }

  findPropostaByEventoId(idEvento: number, idOrg: number): Observable<PropostaResponse> {
    return this.http.get<PropostaResponse>(`${this.endpoint}/organizacao/${idOrg}/evento/${idEvento}`);
  }

  existsProposta(idEvento: number, idsOrg: OrganizacaoSearchModel): Observable<Organizacao[]>{
    const params = new HttpParams({fromObject: idsOrg});
    return this.http.get<Organizacao[]>(`${this.endpoint}/existe/evento/${idEvento}/organizacao`, {params});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

  encerrarProposta(id: number): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/${id}/encerrar-proposta`, {});
  }

  sendProposta(id: number): Observable<any> {
    return this.http.patch<any>(`${this.endpoint}/${id}/enviar`, {});
  }
}
