import { PropostaService } from './../../../services/proposta.service';
import { IndicacaoResponse } from './../../../models/indicacao.model';
import { IndicacaoService } from './../../../services/indicacao.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proposta } from 'src/app/models/proposta.model';

@Injectable()
export class PropostaFacade {
    constructor(
      private indicacaoService: IndicacaoService,
      private propostaService: PropostaService
      ) {
    }

    findAllIndicacoesByEvento(idEvento: number): Observable<IndicacaoResponse[]> {
        return this.indicacaoService.findAllIndicacoesByEvento(idEvento);
    }

    createProposta(record: Proposta): Observable<Proposta>{
      return this.propostaService.create(record);
    }

}
