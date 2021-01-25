import { IndicacaoResponse } from './../../../models/indicacao.model';
import { IndicacaoService } from './../../../services/indicacao.service';
import { Injectable } from '@angular/core';
import { Indicacao } from '../../../models/indicacao.model';
import { Observable } from 'rxjs';

@Injectable()
export class PropostaFacade {
    constructor(private indicacaoService: IndicacaoService) {
    }

    findAllIndicacoesByEvento(idEvento: number): Observable<IndicacaoResponse[]> {
        return this.indicacaoService.findAllIndicacoesByEvento(idEvento);
      }

}