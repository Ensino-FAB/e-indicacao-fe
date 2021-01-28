import { Indicacao } from './../../../../models/indicacao.model';
import { PessoaIndicada } from 'src/app/models/pessoa.model';
import { ToastService } from './../../../../shared/services/toast.service';
import { Proposta } from './../../../../models/proposta.model';
import { ItemProposta } from './../../../../models/item-proposta.model';
import { Subscription, of, timer } from 'rxjs';

import { PropostaFacade } from './../proposta-facade';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { share, mapTo, takeUntil, mergeAll } from 'rxjs/operators';
import {IndicacaoSearchModel} from "../../../../models/indicacao-search.model";


@Component({
  selector: 'app-analise',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.scss']
})
export class AnaliseComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  private idEvento: number;
  isLoading = false;
  indicados: PessoaIndicada[] = [];
  indicacoes: Indicacao[] = [];
  selecionados: PessoaIndicada[] = [];
  pessoaSelecionada: PessoaIndicada;
  search: IndicacaoSearchModel;

  constructor(
    private route: ActivatedRoute,
    private propostaFacade: PropostaFacade,
    private toast: ToastService) { }

  ngOnInit(): void {
    this.idEvento = this.route.snapshot.params.id;

    const getIndicacoes$ = this.propostaFacade.findAllIndicacoesByEvento(this.search ,this.idEvento).pipe(share());
    const isLoading$ = of(
      timer(150).pipe(mapTo(true), takeUntil(getIndicacoes$)),
      getIndicacoes$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe(status => {
        this.isLoading = status;
      }),
      // getIndicacoes$
      //   .subscribe(indicacoes => {
      //     this.indicacoes = indicacoes;
      //     const pessoas = indicacoes.map(ind => {
      //       const pessoaIndicada: PessoaIndicada = {
      //         // indicacao: ind
      //       };
      //       return pessoaIndicada;
      //     });
      //     this.indicados = pessoas;
      //   })
    );
  }

  salvarProposta(): void {
    if (this.selecionados.length) {
      const itensProposta = this.selecionados.map(item => {
        const itemProposta: ItemProposta = {
          id: undefined,
          prioridade: item.prioridade,
          indicacao: item.indicacao
        };
        return itemProposta;
      });

      const proposta: Proposta = {
        dataInclusao: new Date(),
        eventoId: this.idEvento,
        observacoes: 'criar textArea para observações e como buscar a organização do usuário logado',
        organizacaoMilitarId: '1234567',
        statusProposta: 'ABERTA',
        itensProposta
      };

      this.propostaFacade
      .createProposta(proposta).subscribe(response => {
        this.toast.show({
          message: 'A proposta foi salva com sucesso!',
          type: 'success',
        });
      }
      );
    }
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

  onSourceSelect(event: any): void {
    if (event.items) {
      this.pessoaSelecionada = event.items[0];
    }
  }

  onTargetSelect(event: any): void {
    if (event.items) {
      this.pessoaSelecionada = event.items[0];
    }
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
