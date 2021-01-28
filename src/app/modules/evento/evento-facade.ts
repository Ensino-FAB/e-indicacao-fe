import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Pageable} from '../../core/models/pageable.model';
import {EventoService} from '../../services/evento.service';
import {EventoSearchModel} from '../../models/evento-search.model';
import {Evento} from '../../models/evento.model';
import {OrganizacaoService} from '../../services/organizacao.service';



@Injectable()
export class EventoFacade {
  // tslint:disable-next-line:variable-name
  private _eventoService: EventoService;
  // tslint:disable-next-line:variable-name
  private _organizacaoService: OrganizacaoService;


  constructor(private injector: Injector) {
  }

  private get eventoService(): EventoService {
    if (!this._eventoService) {
      this._eventoService = this.injector.get(EventoService);
    }
    return this._eventoService;
  }

  public getAllEvento(
    search: EventoSearchModel
  ): Observable<Pageable<Evento>> {
    return this.eventoService.findAll(search);
  }

  public delete(id: number): Observable<any> {
    return this.eventoService.remove(id);
  }

  public save(record: Evento): any {
    return this.eventoService.save(record);
  }

  public findEvento(id: number): Observable<Evento> {
    return this.eventoService.findById(id);
  }

  public get organizacaoService(): OrganizacaoService {
    if (!this._organizacaoService) {
      this._organizacaoService = this.injector.get(OrganizacaoService);
    }
    return this._organizacaoService;
  }
}
