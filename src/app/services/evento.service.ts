import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Evento} from '../models/evento.model';
import {Pageable} from '../core/models/pageable.model';
import {EventoSearchModel} from '../models/evento-search.model';

@Injectable({
  providedIn: 'root',
})

export class EventoService {
  constructor(protected http: HttpClient) {
  }

  private endpoint = `${environment.CURSOS_INDICACAO_API}/evento`;

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

  findById(id: number): Observable<Evento> {
    return this.http.get<any>(
      `${environment.CURSOS_INDICACAO_API}/evento/${id}`
    );
  }

  findAll(search: EventoSearchModel): Observable<Pageable<Evento>> {
    this.removeEmptyFields(search);
    const params = new HttpParams({fromObject: search});
    return this.http.get<any>(this.endpoint, {
      params,
    });
  }

  // tslint:disable-next-line:typedef
  find(id: number) {
    return this.http.get<Evento>(`${this.endpoint}/${id}`).pipe(take(1));
  }

  create(record: Evento): Observable<Evento> {
    return this.http.post(this.endpoint, record).pipe(take(1)) as Observable<Evento>;
  }

  // tslint:disable-next-line:typedef
  update(id: number, record: Evento) {
    return this.http.put(`${this.endpoint}`, record).pipe(take(1));
  }

  save(record: Evento): any {
    if (record.id) {
      return this.update(record.id, record);
    }
    return this.create(record);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
