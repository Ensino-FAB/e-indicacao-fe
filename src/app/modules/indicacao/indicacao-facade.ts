import {Injectable, Injector} from '@angular/core';

import {IndicacaoService} from '../../services/indicacao.service';
import {PessoaService} from '../../services/pessoa.service';
import {EventoService} from "../../services/evento.service";
import {OrganizacaoService} from "../../services/organizacao.service";


@Injectable()
export class IndicacaoFacade {

  // tslint:disable-next-line:variable-name
  private _indicacaoService: IndicacaoService;

  // tslint:disable-next-line:variable-name
  private _pessoaService: PessoaService;

  // tslint:disable-next-line:variable-name
  private _eventoService: EventoService;

  // tslint:disable-next-line:variable-name
  private _organizacaoService: OrganizacaoService;


  constructor(private injector: Injector) {
  }


  public get indicacaoService(): IndicacaoService {
    if (!this._indicacaoService) {
      this._indicacaoService = this.injector.get(IndicacaoService);
    }
    return this._indicacaoService;
  }

  public get pessoaService(): PessoaService {
    if (!this._pessoaService) {
      this._pessoaService = this.injector.get(PessoaService);
    }
    return this._pessoaService;
  }

  public get eventoService(): EventoService {
    if (!this._eventoService) {
      this._eventoService = this.injector.get(EventoService);
    }
    return this._eventoService;
  }

  public get organizacaoService(): OrganizacaoService {
    if (!this._organizacaoService) {
      this._organizacaoService = this.injector.get(OrganizacaoService);
    }
    return this._organizacaoService;
  }

}
