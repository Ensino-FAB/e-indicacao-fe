import { OrganizacaoService } from './../../../services/organizacao.service';
import { EventoService } from './../../../services/evento.service';
import { PropostaResponse } from './../../../models/proposta.model';
import { Pageable } from './../../../core/models/pageable.model';
import { PropostaSearchModel } from './../../../models/proposta-search.model';
import { PropostaService } from './../../../services/proposta.service';
import { Indicacao, IndicacaoResponse } from './../../../models/indicacao.model';
import { IndicacaoService } from './../../../services/indicacao.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropostaRequest } from 'src/app/models/proposta.model';
import { IndicacaoSearchModel } from '../../../models/indicacao-search.model';
import { Organizacao } from 'src/app/models/organizacao.model';

@Injectable()
export class PropostaFacade {
  constructor(
    private indicacaoService: IndicacaoService,
    private propostaService: PropostaService,
    private organizacaoService: OrganizacaoService
  ) {
  }

  findAllIndicacoesByEvento(search: IndicacaoSearchModel, idEvento: number): Observable<IndicacaoResponse[]> {
    return this.indicacaoService.findAllIndicacoesByEvento(search, idEvento);
  }

  findAllPropostas(search: PropostaSearchModel): Observable<Pageable<PropostaResponse>> {
    return this.propostaService.findAll(search);
  }

  createProposta(record: PropostaRequest): Observable<PropostaResponse> {
    if (!record.id){
      return this.propostaService.create(record);
    }else{
      return this.propostaService.update(record);
    }
  }

  deleteProposta(id: number): Observable<any> {
    return this.propostaService.delete(id);
  }

  findOrganizacoesDiretamenteSubordinadas(cdOrg: string): Observable<Organizacao[]> {
    return this.organizacaoService.findOrganizacoesDiretamenteSubordinadas(cdOrg);
  }

  existProposta(idEvento: number, idOrg: number): Observable<boolean> {
    return this.propostaService.existsProposta(idEvento, idOrg);
  }

  findPropostaByEventoId(idEvento: number, idOrg: number): Observable<PropostaResponse> {
    return this.propostaService.findPropostaByEventoId(idEvento, idOrg);
  }

  finishProposta(id: number): Observable<any> {
    return this.propostaService.encerrarProposta(id);
  }
}
