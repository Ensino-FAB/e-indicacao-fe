import { PropostaResponse } from './../../../models/proposta.model';
import { Pageable } from './../../../core/models/pageable.model';
import { PropostaSearchModel } from './../../../models/proposta-search.model';
import { PropostaService } from './../../../services/proposta.service';
import {Indicacao, IndicacaoResponse} from './../../../models/indicacao.model';
import { IndicacaoService } from './../../../services/indicacao.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proposta } from 'src/app/models/proposta.model';
import {IndicacaoSearchModel} from '../../../models/indicacao-search.model';

@Injectable()
export class PropostaFacade {
    constructor(
      private indicacaoService: IndicacaoService,
      private propostaService: PropostaService
      ) {
    }

    findAllIndicacoesByEvento(search: IndicacaoSearchModel, idEvento: number): Observable<IndicacaoResponse[]> {
        return this.indicacaoService.findAllIndicacoesByEvento(search, idEvento);
    }

    findAllPropostas(search: PropostaSearchModel): Observable<Pageable<PropostaResponse>> {
      return this.propostaService.findAll(search);
    }

    createProposta(record: Proposta): Observable<Proposta>{
      return this.propostaService.create(record);
    }

    delete(id: number): Observable<any>{
      return this.propostaService.delete(id);
    }

}
