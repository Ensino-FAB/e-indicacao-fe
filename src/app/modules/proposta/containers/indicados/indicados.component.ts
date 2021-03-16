import { Component, OnInit } from '@angular/core';
import {TableColumn} from "@cca-fab/cca-fab-components-common";
import {mapTo, mergeAll, share, takeUntil} from "rxjs/operators";
import {of, Subscription, timer} from "rxjs";
import {PropostaFacade} from "../proposta-facade";
import {UserService} from "../../../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-indicados',
  templateUrl: './indicados.component.html',
  styleUrls: ['./indicados.component.scss']
})
export class IndicadosComponent implements OnInit {

  private subs$: Subscription[] = [];
  isLoading = false;
  asc = true;
  pageSize = 20;
  page = 1;
  count: number;
  orderBy: string[] = ['id'];
  totalPages = 1;
  data = [];
  public idEvento: number;
  public orgLogada = this.userService.user.organizacao;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private propostaFacade: PropostaFacade) { }

  columns: TableColumn[] = [
    {
      field: 'pessoaNome',
      title: 'Militar indicado',
      width: '50%',
    },
    {
      field: 'prioridade',
      title: 'Prioridade',
      width: '10%',
    },
    {
      field: 'siglaOrganizacaoSolicitante',
      title: 'Organização Solicitante',
      width: '20%',
    },
    {
      field: 'siglaOrganizacaoBeneficiada',
      title: 'Organização Beneficiada',
      width: '20%',
    },
  ];

  ngOnInit(): void {
    this.idEvento = this.activatedRoute.snapshot.params.id;
    this.refresh();
  }

  refresh() {
    const getProposta$ = this.propostaFacade.findPropostaByEventoId(this.idEvento, this.orgLogada.id, 'ENVIADA').pipe(share());
    const isLoading$ = of(
      timer(150).pipe(mapTo(true), takeUntil(getProposta$)),
      getProposta$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe((status) => {
        this.isLoading = status;
      }),
      getProposta$.subscribe((res) => {
        this.data = res.itensProposta.map((item) => ({
          pessoaNome: `${item.indicacao.pessoa.nome}`,
          prioridade: `${item.prioridade}`,
          siglaOrganizacaoSolicitante: `${item.indicacao.organizacaoSolicitante.sigla}`,
          siglaOrganizacaoBeneficiada: `${item.indicacao.organizacaoSolicitante.sigla}`
        }));
      })
    );
  }

  handlePageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.page = 1;
    this.refresh();
  }

  onFirstPage(): void {
    this.page = 1;
    this.refresh();
  }

  onLastPage(): void {
    this.page = this.totalPages;
    this.refresh();
  }

  handlePageIndexChange(page: number): void {
    this.page = page;
    this.refresh();
  }

  handleNextPage(): void {
    this.page = Math.min(this.page + 1, this.totalPages);
    this.refresh();
  }

  handlePreviousPage(): void {
    this.page = Math.max(this.page - 1, 1);
    this.refresh();
  }
}
