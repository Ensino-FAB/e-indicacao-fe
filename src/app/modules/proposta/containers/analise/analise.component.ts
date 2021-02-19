import { SelectButtonOrganizacao } from './../../../../models/organizacao.model';
import { ToastService } from './../../../../shared/services/toast.service';
import { PropostaRequest, PropostaResponse } from './../../../../models/proposta.model';
import { ItemPropostaRequest, ItemPropostaResponse } from './../../../../models/item-proposta.model';
import { Subscription, of, timer } from 'rxjs';
import { PropostaFacade } from './../proposta-facade';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { share, mapTo, takeUntil, mergeAll, switchMap, map } from 'rxjs/operators';
import { UserService } from '../../../../shared/services/user.service';
import { Evento } from '../../../../models/evento.model';
import { EventoService } from '../../../../services/evento.service';


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
  public evento: Evento;

  isLoading = false;
  fichas: ItemPropostaResponse[] = [];
  fichasSelecionadas: ItemPropostaResponse[] = [];
  private orgLogada = this.userService.user.organizacao;

  constructor(
    private activatedRoute: ActivatedRoute,
    private propostaFacade: PropostaFacade,
    private toast: ToastService,
    private userService: UserService,
    private eventoService: EventoService,
  ) {
  }

  ngOnInit(): void {
    this.idEvento = this.activatedRoute.snapshot.params.id;
    this.buscarFichasEPropostaOrgLogada(this.orgLogada.id);
    this.buscarOrgSubordinadas();
    this.buscarEvento();
  }

  buscarEvento(): void {
    this.eventoService.findById(this.idEvento).subscribe((response) => {
      this.evento = response;
    });
  }

  buscarOrgSuperiores(): void {
    this.propostaFacade.findOrgSuperior()
      .subscribe(orgs => {
        const temp = orgs.map(org => {
          return {
            id: org.id,
            sigla: org.sigla,
            nome: org.nome,
            cdOrg: org.cdOrg,
            inativo: false,
          };
        });

        temp.forEach(org => {
          this.propostaFacade.existProposta(this.idEvento, org.id)
            .subscribe(response => org.inativo = !response);
        });
        this.organizacoes = this.organizacoes.concat(temp);
      });

  }

  buscarFichasEPropostaOrgLogada(idOrg: number): void {
    const getProposta$ = this.propostaFacade.findPropostaByEventoId(this.idEvento, idOrg);
    const getIndicacoes$ = this.propostaFacade
      .findAllIndicacoesByEvento(
        {
          size: 500,
          codOrganizacaoSolicitante: idOrg.toString(),
        }, this.idEvento
      );

    this.subs$.push(
      getProposta$.pipe(
        switchMap(proposta => {
          this.proposta = proposta;
          this.fichasSelecionadas = proposta.itensProposta;
          return getIndicacoes$.pipe(
            map(indicacoes => indicacoes.filter(
              indicacao => !proposta.itensProposta.map(item => item.indicacao.id)
                .includes(indicacao.id)
            ))
          );
        })
      ).subscribe(indicacoes => {
        this.fichas = indicacoes.map(ind => {
          const pessoaIndicada: ItemPropostaResponse = {
            indicacao: ind
          };
          return pessoaIndicada;
        });
      })
    );
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
            inativo: false,
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

          if (this.orgLogada.id === this.evento.codOrganizacaoGestora) {
            this.buscarOrgSuperiores();
          }
        }
      });
  }

  buscarProposta(cdOrg: number): void {
    this.subs$.push(
      this.propostaFacade.findPropostaByEventoId(this.idEvento, cdOrg)
        .subscribe(response => {
          this.proposta = response;
          this.fichasSelecionadas = response.itensProposta;
        })
    );
  }

  buscarPropostaOrgSubordinada(cdOrgSubordinada: number): void {
    const getProposta$ = this.propostaFacade.findPropostaByEventoId(this.idEvento, this.orgLogada.id);
    const getPropostaOrgSubordinada$ = this.propostaFacade.findPropostaByEventoId(this.idEvento, cdOrgSubordinada);
    this.subs$.push(
      getProposta$.pipe(
        switchMap(proposta => {
          this.proposta = proposta;
          this.fichasSelecionadas = proposta.itensProposta;
          return getPropostaOrgSubordinada$;
        })
      ).subscribe(propostaSubordinada => {
        this.fichas = this.filtrarFichas(propostaSubordinada.itensProposta, this.fichasSelecionadas);
      })
    );
  }

  buscarFichas(idOrganizacao: number): void {
    const getIndicacoes$ = this.propostaFacade
      .findAllIndicacoesByEvento(
        {
          size: 500,
          codOrganizacaoSolicitante: idOrganizacao.toString(),
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
          const fichasTemp = indicacoes.map(ind => {
            const pessoaIndicada: ItemPropostaResponse = {
              indicacao: ind
            };
            return pessoaIndicada;
          });
          this.fichas = this.filtrarFichas(fichasTemp, this.fichasSelecionadas);
        })
    );
  }

  filtrarFichas(fichas: ItemPropostaResponse[],
                fichasSelecionadas: ItemPropostaResponse[]): ItemPropostaResponse[] {
    return fichas.filter(
      ficha => !fichasSelecionadas.map(el => el.indicacao.id).includes(ficha.indicacao.id)
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

    const salvarProposta$ =
      proposta.id ? this.propostaFacade.updateProposta(proposta) : this.propostaFacade.createProposta(proposta);

    this.subs$.push(
      salvarProposta$.subscribe(response => {
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
      id: this.proposta?.id ? this.proposta.id : undefined,
      dataInclusao: this.proposta ? this.proposta.dataInclusao : new Date(),
      eventoId: this.idEvento,
      observacoes: 'criar textArea para observações e como buscar a organização do usuário logado',
      codOrganizacao: this.orgLogada.id,
      statusProposta: 'ABERTA',
      itensProposta
    };

    return proposta;
  }

  encerrarProposta(): void {
    this.propostaFacade.finishProposta(this.proposta.id).subscribe(response => {
      this.buscarFichas(this.orgLogada.id);
      this.toast.show({
        message: 'A proposta foi finalizada com sucesso',
        type: 'success',
      });
    });
  }

  onOptionClick(event: any): void {
    const { option } = event;
    if (this.orgLogada.id === option.id) {
      this.buscarFichasEPropostaOrgLogada(this.orgLogada.id);
    } else {
      this.buscarPropostaOrgSubordinada(option.id);
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
    this.buscarFichas(this.organizacaoSelecionada.id);
  }

  onMoveAllToSource(event: any): void {
    this.calcularOrdem();
    this.buscarFichas(this.organizacaoSelecionada.id);
  }

  calcularOrdem(): void {
    this.fichasSelecionadas.forEach((ind, i) => {
      ind.prioridade = i + 1;
    });
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}