import {Injectable, Injector} from '@angular/core';

import {Observable} from 'rxjs';
import {IndicacaoService} from '../../services/indicacao.service';
import {IndicacaoSearchModel} from '../../models/indicacao-search.model';
import {Indicacao} from '../../models/indicacao.model';
import {Pageable} from '../../core/models/pageable.model';


@Injectable()
export class IndicacaoFacade {
  // tslint:disable-next-line:variable-name
  private _indicacaoService: IndicacaoService;

  constructor(private injector: Injector) {
  }

  private get service(): IndicacaoService {
    if (!this._indicacaoService) {
      this._indicacaoService = this.injector.get(IndicacaoService);
    }
    return this._indicacaoService;
  }

  public getAllIndicacao(
    search: IndicacaoSearchModel
  ): Observable<Pageable<Indicacao>> {
    return this.service.findAll(search);
  }

  public delete(id: number): Observable<any> {
    return this.service.remove(id);
  }

  public save(record: Indicacao): any {
    return this.service.save(record);
  }

  public findIndicacao(id: number): Observable<Indicacao> {
    return this.service.findById(id);
  }
}
