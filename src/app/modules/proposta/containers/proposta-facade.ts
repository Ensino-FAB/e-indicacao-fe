import { OrganizacaoSearchModel } from './../../../models/organizacao-search.model';
import {OrganizacaoService} from './../../../services/organizacao.service';
import {EventoService} from './../../../services/evento.service';
import {PropostaResponse} from './../../../models/proposta.model';
import {Pageable} from './../../../core/models/pageable.model';
import {PropostaSearchModel} from './../../../models/proposta-search.model';
import {PropostaService} from './../../../services/proposta.service';
import {Indicacao, IndicacaoResponse} from './../../../models/indicacao.model';
import {IndicacaoService} from './../../../services/indicacao.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PropostaRequest} from 'src/app/models/proposta.model';
import {IndicacaoSearchModel} from '../../../models/indicacao-search.model';
import {Organizacao} from 'src/app/models/organizacao.model';

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
    return this.propostaService.create(record);
  }

  updateProposta(record: PropostaRequest): Observable<PropostaResponse> {
    return this.propostaService.update(record);
  }

  deleteProposta(id: number): Observable<any> {
    return this.propostaService.delete(id);
  }

  findOrganizacoesDiretamenteSubordinadas(cdOrg: number): Observable<Organizacao[]> {
    return this.organizacaoService.findOrganizacoesDiretamenteSubordinadas(cdOrg);
  }

  findOrgSuperior(): Observable<Organizacao[]> {
    return this.organizacaoService.findOrganizacoesSuperiores();
  }

  existProposta(idEvento: number, idsOrg: OrganizacaoSearchModel): Observable<Organizacao[]> {
    return this.propostaService.existsProposta(idEvento, idsOrg);
  }

  findPropostaByEventoId(idEvento: number, idOrg: number, statusProposta: string): Observable<PropostaResponse> {
    return this.propostaService.findPropostaByEventoId(idEvento, idOrg, statusProposta);
  }

  finishProposta(id: number): Observable<any> {
    return this.propostaService.encerrarProposta(id);
  }

  sendProposta(id: number): Observable<any> {
    return this.propostaService.sendProposta(id);
  }
}
