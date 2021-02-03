import { Indicacao } from './../../../../models/indicacao.model';
import { ToastService } from './../../../../shared/services/toast.service';
import { PropostaRequest, PropostaResponse } from './../../../../models/proposta.model';
import { ItemPropostaRequest, ItemPropostaResponse } from './../../../../models/item-proposta.model';
import { Subscription, of, timer, Observable } from 'rxjs';

import { PropostaFacade } from './../proposta-facade';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { share, mapTo, takeUntil, mergeAll, concatAll, tap } from 'rxjs/operators';



@Component({
  selector: 'app-analise',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.scss']
})
export class AnaliseComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  public idEvento: number;
  private proposta: PropostaResponse;
  isLoading = false;
  indicados: ItemPropostaResponse[] = [];
  indicacoes: Indicacao[] = [];
  selecionados: ItemPropostaResponse[] = [];
  private orgLogada = {cdOrg: '332053', idOrg: 846};
  //private orgLogada = { cdOrg: '442509', idOrg: 1322 }; //SJ
  //private orgLogada = {cdOrg: '032001', idOrg: 1323}; //RJ
  //private orgLogada = {cdOrg: '360702', idOrg: 1324}; //BR

  constructor(
    private activatedRoute: ActivatedRoute,
    private propostaFacade: PropostaFacade,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.idEvento = this.activatedRoute.snapshot.params.id;
    this.buscarIndicacoes();
  }

  buscarProposta(cdOrg: string): Observable<PropostaResponse> {
    return this.propostaFacade.findPropostaByEventoId(this.idEvento, cdOrg);
  }

  buscarIndicacoes(): void {
    const getIndicacoes$ = this.propostaFacade
      .findAllIndicacoesByEvento({ eventoId: this.idEvento, codOrganizacaoSolicitante: '' + this.orgLogada.idOrg }, this.idEvento)
      .pipe(share());
    const getProposta$ = this.buscarProposta('' + this.orgLogada.idOrg)
      .pipe(share());

    const isLoading$ = of(
      timer(150).pipe(
        mapTo(true),
        takeUntil(getIndicacoes$)),
      getIndicacoes$.pipe(mapTo(false)),
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe(status => {
        this.isLoading = status;
      }),
      getIndicacoes$
        .subscribe(indicacoes => {
          this.indicacoes = indicacoes;
          const pessoas = indicacoes.map(ind => {
            const pessoaIndicada: ItemPropostaResponse = {
              indicacao: ind
            };
            return pessoaIndicada;
          });
          this.indicados = pessoas;

          this.subs$.push(
            getProposta$.subscribe(resp => {
              this.proposta = resp;
              const idsIndicacao = resp.itensProposta.map(item => item.indicacao.id);
              const fichasNaoSelecionadas = this.indicados.filter(ind => !idsIndicacao.includes(ind.indicacao.id));
              const fichasSelecionadas = this.indicados.filter(ind => idsIndicacao.includes(ind.indicacao.id));
              this.selecionados = fichasSelecionadas;
              this.indicados = fichasNaoSelecionadas;
              this.calcularOrdem();
            })
          );
        })
    );
  }

  salvarProposta(): void {
    if (!this.selecionados.length && !this.proposta) {
      this.toast.show({
        message: 'É necessário selecionar alguma ficha para salvar a proposta',
        type: 'error',
      });

      return;
    }

    const itensProposta = this.selecionados.map(item => {
      const itemPropostaRequest: ItemPropostaRequest = {
        id: null,
        prioridade: item.prioridade,
        indicacaoId: item.indicacao.id
      };

      return itemPropostaRequest;
    });

    const proposta: PropostaRequest = {
      id: this.proposta ? this.proposta.id : null,
      dataInclusao: this.proposta ? this.proposta.dataInclusao : new Date(),
      eventoId: this.idEvento,
      observacoes: 'criar textArea para observações e como buscar a organização do usuário logado',
      codOrganizacao: this.orgLogada.idOrg,
      statusProposta: 'ABERTA',
      itensProposta
    };

    this.subs$.push(
      this.propostaFacade
        .createProposta(proposta).subscribe(response => {
          this.proposta = response;
          this.toast.show({
            message: 'A proposta foi salva com sucesso!',
            type: 'success',
          });
        }
        )
    );

  }

  onTargetReorder(event: any): void {
    this.calcularOrdem();
  }

  onMoveToTarget(event: any): void {
    this.calcularOrdem();
  }

  onMoveAllToTarget(event: any): void {
    this.calcularOrdem();
  }

  onMoveToSource(event: any): void {
    this.calcularOrdem();
    this.removeOrdem();
  }

  onMoveAllToSource(event: any): void {
    this.calcularOrdem();
    this.removeOrdem();
  }

  calcularOrdem(): void {
    this.selecionados.forEach((ind, i) => {
      ind.prioridade = i + 1;
    });
  }

  removeOrdem(): void {
    this.indicados.forEach(ind => ind.prioridade = undefined);
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
