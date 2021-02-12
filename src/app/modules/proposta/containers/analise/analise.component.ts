import { SelectButtonOrganizacao } from './../../../../models/organizacao.model';
import { Indicacao } from './../../../../models/indicacao.model';
import { ToastService } from './../../../../shared/services/toast.service';
import { PropostaRequest, PropostaResponse } from './../../../../models/proposta.model';
import { ItemPropostaRequest, ItemPropostaResponse } from './../../../../models/item-proposta.model';
import { Subscription, of, timer, Observable } from 'rxjs';

import { PropostaFacade } from './../proposta-facade';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { share, mapTo, takeUntil, mergeAll, map, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-analise',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.scss']
})
export class AnaliseComponent implements OnInit, OnDestroy {

  organizacoes: SelectButtonOrganizacao[];
  organizacaoSelecionada: SelectButtonOrganizacao;

  private subs$: Subscription[] = [];
  public proposta: PropostaResponse;
  public idEvento: number;

  isLoading = false;
  fichas: ItemPropostaResponse[] = [];
  fichasSelecionadas: ItemPropostaResponse[] = [];
  private orgLogada = { nome: 'diretoria', sigla: 'DTI', cdOrg: '332053', id: 846 }; //DTI
  //private orgLogada = { nome: 'diretoria', sigla: 'CCA SJ', cdOrg: '442509', id: 1322 }; //SJ RAMON
  //private orgLogada = {cdOrg: '032001', id: 1323}; //RJ Julilana
  //private orgLogada = {cdOrg: '360702', id: 1324}; //BR Plinio
  //private orgLogada = {cdOrg: '332050', id: 848}; //DIRMAB

  constructor(
    private activatedRoute: ActivatedRoute,
    private propostaFacade: PropostaFacade,
    private toast: ToastService,
  ) { }

  ngOnInit(): void {
    this.idEvento = this.activatedRoute.snapshot.params.id;

    this.buscarProposta(this.orgLogada.id);
    this.buscarFichas(this.orgLogada.id);
    this.buscarOrgSubordinadas();
  }

  buscarOrgSubordinadas(): void {
    this.propostaFacade
      .findOrganizacoesDiretamenteSubordinadas(this.orgLogada.cdOrg)
      .subscribe(orgs => {
        const temp = orgs.map(org => {
          return {
            id: org.id,
            sigla: org.sigla,
            nome: org.nome,
            cdOrg: org.cdOrg,
            inativo: false
          };
        });

        temp.forEach(org => {
          this.propostaFacade.existProposta(this.idEvento, org.id)
            .subscribe(response => org.inativo = !response);
        });

        if (temp.length > 0) {
          temp.unshift({
            id: this.orgLogada.id,
            sigla: this.orgLogada.sigla,
            nome: this.orgLogada.nome,
            cdOrg: this.orgLogada.cdOrg,
            inativo: false
          });

          this.organizacoes = temp;
          this.organizacaoSelecionada = this.organizacoes[0];
        }
      });
  }

  buscarProposta(cdOrg: number): void {
    this.subs$.push(
      this.propostaFacade.findPropostaByEventoId(this.idEvento, cdOrg)
        .subscribe(response => {
          this.fichasSelecionadas = response.itensProposta;
        })
    );
  }

  buscarPropostaOrgSubordinada(cdOrgSubordinada: number): void {
    this.subs$.push(
      this.propostaFacade.findPropostaByEventoId(this.idEvento, cdOrgSubordinada)
        .subscribe(response => {
          this.fichas = response.itensProposta;
        })
    );
  }

  buscarFichas(idOrganizacao: number): void {
    const getIndicacoes$ = this.propostaFacade
      .findAllIndicacoesByEvento(
        {
          eventoId: this.idEvento,
          codOrganizacaoSolicitante: idOrganizacao.toString()
        }, this.idEvento)
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
          const pessoas = indicacoes.map(ind => {
            const pessoaIndicada: ItemPropostaResponse = {
              indicacao: ind
            };
            return pessoaIndicada;
          });
          this.fichas = pessoas;
        })
    );
  }

  salvarProposta(): void {
    this.validarProposta();

    const itensProposta = this.fichasSelecionadas.map(item => {
      const itemPropostaRequest: ItemPropostaRequest = {
        id: null,
        prioridade: item.prioridade,
        indicacaoId: item.indicacao.id
      };

      return itemPropostaRequest;
    });

    const proposta = this.gerarProposta(itensProposta);

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

  validarProposta(): void {
    if (this.fichasSelecionadas.length === 0) {
      if (this.proposta) {
        this.propostaFacade.deleteProposta(this.proposta.id)
          .subscribe(() => {
            this.toast.show({
              message: 'Proposta cancelada',
              type: 'success',
            });
            this.proposta = null;
          });
        return;
      }

      this.toast.show({
        message: 'É necessário selecionar alguma ficha para salvar a proposta',
        type: 'error',
      });

      return;
    }
  }

  gerarProposta(itensProposta: ItemPropostaRequest[]): PropostaRequest {
    const proposta: PropostaRequest = {
      id: this.proposta ? this.proposta.id : null,
      dataInclusao: this.proposta ? this.proposta.dataInclusao : new Date(),
      eventoId: this.idEvento,
      observacoes: 'criar textArea para observações e como buscar a organização do usuário logado',
      codOrganizacao: this.orgLogada.id,
      statusProposta: 'ABERTA',
      itensProposta
    };


    return proposta;
  }

  onTargetReorder(event: any): void {
    this.calcularOrdem();
  }

  onMoveToTarget(event: any): void {
    this.calcularOrdem();
  }

  encerrarProposta(): void {
    this.propostaFacade.finishProposta(this.proposta.id).subscribe(response => {
      this.buscarFichas(this.orgLogada.id);
      this.toast.show({
        message: 'A proposta foi finalizada com sucesso',
        type: 'success',
      })
    });

  }

  onOptionClick(event) {
    const { option } = event;
    if (this.orgLogada.id === option.id) {
      this.buscarProposta(option.cdOrg);
      this.buscarFichas(option.id);
    }else{
      this.buscarPropostaOrgSubordinada(option.id);
    }
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
    this.fichasSelecionadas.forEach((ind, i) => {
      ind.prioridade = i + 1;
    });
  }

  removeOrdem(): void {
    this.fichas.forEach(ind => ind.prioridade = undefined);
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}

