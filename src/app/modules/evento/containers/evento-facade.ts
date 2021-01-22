import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Pageable} from '../../../core/models/pageable.model';
import {EventoService} from "../../../services/evento.service";
import {EventoSearchModel} from "../../../models/evento-search.model";
import {Evento} from "../../../models/evento.model";


@Injectable()
export class EventoFacade {
  // tslint:disable-next-line:variable-name
  private _eventoService: EventoService;

  constructor(private injector: Injector) {
  }

  private get service(): EventoService {
    if (!this._eventoService) {
      this._eventoService = this.injector.get(EventoService);
    }
    return this._eventoService;
  }

  public getAllEvento(
    search: EventoSearchModel
  ): Observable<Pageable<Evento>> {
    return this.service.findAll(search);
  }

  public delete(id: number): Observable<any> {
    return this.service.remove(id);
  }

  public save(record: Evento): any {
    return this.service.save(record);
  }

  public findOrganizacao(id: number): Observable<Evento> {
    return this.service.findById(id);
  }
}
