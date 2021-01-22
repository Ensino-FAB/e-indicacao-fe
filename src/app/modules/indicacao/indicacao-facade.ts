import {Injectable, Injector} from '@angular/core';

import {Observable} from 'rxjs';
import {IndicacaoService} from '../../services/indicacao.service';
import {IndicacaoSearchModel} from '../../models/indicacao-search.model';
import {Indicacao} from '../../models/indicacao.model';
import {Pageable} from '../../core/models/pageable.model';
import {PessoaService} from '../../services/pessoa.service';
import {OrganizacaoService} from "../../services/organizacao.service";


@Injectable()
export class IndicacaoFacade {
  // tslint:disable-next-line:variable-name
  private _indicacaoService: IndicacaoService;

  // tslint:disable-next-line:variable-name
  private _pessoaService: PessoaService;

  // tslint:disable-next-line:variable-name
  private _organizacaoService: OrganizacaoService;


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

  public get pessoaService(): PessoaService {
    if (!this._pessoaService) {
      this._pessoaService = this.injector.get(PessoaService);
    }
    return this._pessoaService;
  }

  public get organizacaoService(): OrganizacaoService {
    if (!this._organizacaoService) {
      this._organizacaoService = this.injector.get(OrganizacaoService);
    }
    return this._organizacaoService;
  }

  public findIndicacao(id: number): Observable<Indicacao> {
    return this.service.findById(id);
  }
}
