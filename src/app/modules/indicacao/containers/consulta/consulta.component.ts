import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription, timer} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {TableColumn} from '@cca-fab/cca-fab-components-common';
import {ToastService} from '../../../../shared/services/toast.service';
import {mapTo, mergeAll, share, takeUntil} from 'rxjs/operators';
import {IndicacaoFacade} from '../../indicacao-facade';
import {SelectOption} from "@cca-fab/cca-fab-components-common/types/select";
import {PessoaService} from "../../../../services/pessoa.service";
import {fadeIn} from "../../../../shared/utils/animation";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  animations: [fadeIn()],

})
export class ConsultaComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  idEvento: number;

  // tslint:disable-next-line:variable-name
  _isLoading = false;


  pessoaOptions: SelectOption[] = [];

  eventoOptions: SelectOption[] = [];

  indicacaoSearch = new FormGroup({
    q: new FormControl(''),
    descricao: new FormControl(''),
    titulo: new FormControl(''),
  });

  columns: TableColumn[] = [
    {
      field: 'codPessoa',
      title: 'Pessoa',
      width: '10%',
    },

    {
      field: 'eventoId',
      title: 'Evento',
      width: '25%',
    },


    {
      field: 'codOrganizacaoSolicitante',
      title: 'Organização Solicitante',
      width: '25%',
    },

    {
      field: 'codOrganizacaoBeneficiada',
      title: 'Organização Beneficiada',
      width: '25%',
    },


  ];

  data = [];
  loadindMockData = new Array(10).fill({
    codPessoa: '',
    eventoId: '',
    codOrganizacaoSolicitante: '',
    codOrganizacaoBeneficiada: '',
  });

  options: object[];
  filterOptions: object[];
  asc = true;
  pageSize = 20;
  page = 1;
  count: number;
  orderBy: string[] = ['id'];
  totalPages = 1;

  constructor(
    private facade: IndicacaoFacade,
    private toastService: ToastService,
    private pessoaService: PessoaService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.idEvento = this.route.snapshot.params.id;


    this.options = [
      {name: 'Pessoa', value: 'codPessoa'},
      {name: 'Evento', value: 'eventoId'},
    ];
    this.refresh();
    // @ts-ignore
    this.findPessoas();
    // @ts-ignore
    this.findEvento();
  }

  // tslint:disable-next-line:typedef
  refresh() {
    const search = {
      ...this.indicacaoSearch.value,
      page: this.page ? this.page - 1 : 0,
      size: this.pageSize,
      sort: this.orderBy.map((item) => (this.asc ? item : item + ',desc')),
    };
    const getIndicacao$ = this.facade.indicacaoService.findAllIndicacoesByEvento( this.idEvento).pipe(share());
    console.log(getIndicacao$)
    const isLoading$ = of(
      timer(150).pipe(mapTo(true), takeUntil(getIndicacao$)),
      getIndicacao$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe((status) => {
        this._isLoading = status;
      }),
      getIndicacao$.subscribe((res) => {
        this.data = res.map((item) => ({
          id: `${item?.id}`,
          codPessoa: `${item.pessoa.nome}`,
          eventoId: `${item.evento.nome}`,
          codOrganizacaoBeneficiada: `${item.organizacaoBeneficiada.nome}`,
          codOrganizacaoSolicitante: `${item.organizacaoSolicitante.nome}`,
          justificativa: `${item.justificativa}`,
          observacoes: `${item.observacoes}`,
        })
        );
      })
    );
  }

  handlePageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.page = 1;
    this.refresh();
  }

  onFirstPage() {
    this.page = 1;
    this.refresh();
  }

  onLastPage() {
    this.page = this.totalPages;
    this.refresh();
  }

  handlePageIndexChange(page: number) {
    this.page = page;
    this.refresh();
  }

  handleNextPage() {
    this.page = Math.min(this.page + 1, this.totalPages);
    this.refresh();
  }

  handlePreviousPage() {
    this.page = Math.max(this.page - 1, 1);
    this.refresh();
  }

  handleSortChange(a) {
    this.page = 1;
    if (a === null) {
      this.orderBy = ['id'];
    } else {
      this.orderBy = [a];
    }
    this.refresh();
  }

  handleInvertSort() {
    this.asc = !this.asc;
    this.refresh();
  }

  onSubmit() {
    this.page = 1;
    this.refresh();
  }

  onDelete(id: number): void {
    this.subs$.push(
      this.facade.indicacaoService.remove(id).subscribe(() => {
        this.refresh();
        this.toastService.show({
          message: 'Indicação deletada com sucesso!',
          type: 'success',
        });
      })
    );
  }

  findPessoas(search): void {
    this.pessoaOptions = [];
    this.subs$.push(
      this.facade.pessoaService.findAll(search).subscribe((response) => {
        response.content.map((pessoa) => {
          this.pessoaOptions.push({
            name: pessoa.nome,
            value: pessoa.id,
          });
        });
      })
    );
  }

  findEvento(search): void {
    this.eventoOptions = [];
    this.subs$.push(
      this.facade.eventoService.findAll(search).subscribe((response) => {
        response.content.map((evento) => {
          this.eventoOptions.push({
            name: evento.nome,
            value: evento.id,
          });
        });
      })
    );
  }

  clean() {
    this.indicacaoSearch.reset();
    this.refresh();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
