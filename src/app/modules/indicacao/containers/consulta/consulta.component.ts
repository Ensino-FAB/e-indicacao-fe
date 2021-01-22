import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription, timer} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {TableColumn} from '@cca-fab/cca-fab-components-common';
import {ToastService} from '../../../../shared/services/toast.service';
import {mapTo, mergeAll, share, takeUntil} from 'rxjs/operators';
import {IndicacaoFacade} from '../../indicacao-facade';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  // tslint:disable-next-line:variable-name
  _isLoading = false;

  indicacaoSearch = new FormGroup({
    q: new FormControl(''),
    descricao: new FormControl(''),
    titulo: new FormControl(''),
  });

  columns: TableColumn[] = [
    {
      field: 'Pessoa',
      title: 'codPessoa',
      width: '10%',
    },

    {
      field: 'Evento',
      title: 'eventoId',
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
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.options = [
      {name: 'Codigo', value: 'id'},
      {name: 'Titulo', value: 'titulo'},
      {name: 'Descrição', value: 'descricao'},
    ];
    this.refresh();
  }

  // tslint:disable-next-line:typedef
  refresh() {
    const search = {
      ...this.indicacaoSearch.value,
      page: this.page ? this.page - 1 : 0,
      size: this.pageSize,
      sort: this.orderBy.map((item) => (this.asc ? item : item + ',desc')),
    };
    const getIndicacao$ = this.facade.getAllIndicacao(search).pipe(share());
    const isLoading$ = of(
      timer(150).pipe(mapTo(true), takeUntil(getIndicacao$)),
      getIndicacao$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe((status) => {
        this._isLoading = status;
      }),
      getIndicacao$.subscribe((res) => {
        this.count = res.totalElements;
        this.data = res.content.map((item) => ({
          id: `${item?.id}`,
          codṔessoa: `${item.codPessoa}`,
          eventoId: `${item.eventoId}`,
          codOrganizacaoBeneficiada: `${item.codOrganizacaoBeneficiada}`,
          codOrganizacaoSolicitante: `${item.codOrganizacaoSolicitante}`,
          justificativa: `${item.justificativa}`,
          observacoes: `${item.observacoes}`,
        }));

        this.totalPages = res.totalPages;
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
      this.facade.delete(id).subscribe(() => {
        this.refresh();
        this.toastService.show({
          message: 'Categoria deletada com sucesso!',
          type: 'success',
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
