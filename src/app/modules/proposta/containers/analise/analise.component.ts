import { Subscription, of, timer } from 'rxjs';

import { PropostaFacade } from './../proposta-facade';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PessoaIndicada } from 'src/app/models/pessoa.model';
import { share, mapTo, takeUntil, mergeAll } from 'rxjs/operators';

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
  selecionados: PessoaIndicada[] = [];
  pessoaSelecionada: PessoaIndicada;

  constructor(private route: ActivatedRoute, private propostaFacade: PropostaFacade) { }

  ngOnInit(): void {
    this.idEvento = this.route.snapshot.params.id;

    const getIndicacoes$ = this.propostaFacade.findAllIndicacoesByEvento(this.idEvento).pipe(share());
    const isLoading$ = of(
      timer(150).pipe(mapTo(true), takeUntil(getIndicacoes$)),
      getIndicacoes$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe(status => {
        this.isLoading = status;
      }),
      getIndicacoes$
        .subscribe(indicacoes => {
          const pessoas = indicacoes.map(ind => {
            const pessoaIndicada: PessoaIndicada = {
              nome: ind.pessoa.nome,
              siglaPosto: ind.pessoa.siglaPosto,
              organizacaoBeneficiada: ind.organizacaoBeneficiada.sigla,
              organizacaoSolicitante: ind.organizacaoSolicitante.sigla,
              organizacaoIndicado: ind.pessoa.organizacao.sigla,
              justificativa: ind.justificativa,
              observacao: ind.observacoes,
              contatoPrincipal: ind.pessoa.contatoPrincipal,
              email: ind.pessoa.email
            };
            return pessoaIndicada;
          });

          this.indicados = pessoas;
        })
    );
  }

  onTargetReorder(event: any): void{
    this.calcularOrdem();
  }

  onMoveToTarget(event: any): void{
    this.calcularOrdem();
  }

  onMoveAllToTarget(event: any): void{
    this.calcularOrdem();
  }

  onMoveToSource(event: any): void{
    this.calcularOrdem();
    this.removeOrdem();
  }

  onMoveAllToSource(event: any): void{
    this.calcularOrdem();
    this.removeOrdem();
  }

  onSourceSelect(event: any): void{
    if(event.items){
      this.pessoaSelecionada = event.items[0];
      console.log(this.pessoaSelecionada);
    }
  }

  onTargetSelect(event: any): void{
    if(event.items){
      this.pessoaSelecionada = event.items[0];
      console.log(this.pessoaSelecionada);
    }
  }

  calcularOrdem(): void{
    this.selecionados.forEach((ind, i) => {
        ind.index = i + 1;
    });
  }

  removeOrdem(): void{
    this.indicados.forEach(ind => ind.index = undefined);
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
