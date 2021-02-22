import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from '../core/models/pageable.model';
import { take } from 'rxjs/operators';
import { Organizacao } from '../models/organizacao.model';
import { OrganizacaoSearchModel } from '../models/organizacao-search.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizacaoService {
  constructor(protected http: HttpClient) { }

  private endpoint = `${environment.CURSOS_INDICACAO_API}/organizacao`;

  removeEmptyFields(data): void {
    if (!data) {
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

  findById(id: number): Observable<Organizacao> {
    return this.http.get<any>(`${this.endpoint}/${id}`);
  }

  findAll(search: OrganizacaoSearchModel): Observable<Pageable<Organizacao>> {
    this.removeEmptyFields(search);
    const params = new HttpParams({ fromObject: search });
    return this.http.get<any>(this.endpoint, {
      params,
    });
  }

  find(id: number) {
    return this.http.get<Organizacao>(`${this.endpoint}/${id}`).pipe(take(1));
  }

  findOrganizacoesDiretamenteSubordinadas(cdOrg: number): Observable<Organizacao[]> {
    return this.http.get<Organizacao[]>(`${this.endpoint}/${cdOrg}/subordinadas`);
  }

  findOrganizacoesSuperiores(): Observable<Organizacao[]> {
    return this.http.get<Organizacao[]>(`${this.endpoint}/org-superior`);
  }


  create(data: Organizacao): Observable<Organizacao> {
    return this.http.post<Organizacao>(this.endpoint, data).pipe(take(1));
  }

  update(data: Organizacao): Observable<Organizacao> {
    return this.http
      .put<Organizacao>(`${this.endpoint}/${data.id}`, data)
      .pipe(take(1));
  }

  save(data: Organizacao): any {
    if (data.id) {
      return this.update(data);
    }
    return this.create(data);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
