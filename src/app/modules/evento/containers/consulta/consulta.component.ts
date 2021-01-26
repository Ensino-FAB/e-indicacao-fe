import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription, timer} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {TableColumn} from '@cca-fab/cca-fab-components-common';
import {EventoFacade} from '../evento-facade';
import {mapTo, mergeAll, share, takeUntil} from 'rxjs/operators';
import {ToastService} from '../../../../shared/services/toast.service';
import {fadeIn} from '../../../../shared/utils/animation';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  animations: [fadeIn()],

})
export class ConsultaComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  // tslint:disable-next-line:variable-name
  _isLoading = false;

  eventoSearch = new FormGroup({
    q: new FormControl(''),
    nome: new FormControl(''),
    sigla: new FormControl(''),
    statusEvento: new FormControl(''),
  });

  columns: TableColumn[] = [
        {
      field: 'sigla',
      title: 'Sigla',
      width: '15%',
    },
    {
      field: 'nome',
      title: 'Nome',
      width: '25%',
    },
    {
      field: 'categoriaTitulo',
      title: 'Categoria',
      width: '20%',
    },
    {
      field: 'organizacaoGestoraSigla',
      title: 'Organização Gestora',
      width: '20%',
    },
    {
      field: 'statusEvento',
      title: 'Status',
      width: '10%',
    },
  ];

  data = [];
  loadindMockData = new Array(10).fill({
    descricao: '',
    status: '',
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
    private facade: EventoFacade,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.options = [
      {name: 'Categoria', value: 'categoriaTitulo'},
      {name: 'Organização Gestora', value: 'organizacaoGestoraSigla'},
      {name: 'Nome', value: 'nome'},
      {name: 'Sigla', value: 'sigla'},
      {name: 'Status', value: 'statusEvento'},
      {name: 'Descrição', value: 'descricao'},
    ];
    this.refresh();
  }

  // tslint:disable-next-line:typedef
  refresh() {
    const search = {
      ...this.eventoSearch.value,
      page: this.page ? this.page - 1 : 0,
      size: this.pageSize,
      sort: this.orderBy.map((item) => (this.asc ? item : item + ',desc')),
    };
    const getEvento$ = this.facade.getAllEvento(search).pipe(share());
    const isLoading$ = of(
      timer(150).pipe(mapTo(true), takeUntil(getEvento$)),
      getEvento$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe((status) => {
        this._isLoading = status;
      }),
      getEvento$.subscribe((res) => {
        this.count = res.totalElements;
        this.data = res.content.map((item) => ({
          id: `${item?.id}`,
          categoriaId: `${item.categoriaId}`,
          categoriaTitulo: `${item.categoria.titulo}`,
          codOrganizacaoGestora: `${item.codOrganizacaoGestora}`,
          organizacaoGestoraSigla: `${item.organizacaoResponse.sigla}`,
          dataInicio: `${item.dataInicio}`,
          dataInicioIndicacao: `${item?.dataInicioIndicacao}`,
          dataTermino: `${item.dataTermino}`,
          dataTerminoIndicacao: `${item.dataTerminoIndicacao}`,
          descricao: `${item.descricao}`,
          nome: `${item?.nome}`,
          observacoes: `${item.observacoes}`,
          sigla: `${item.sigla}`,
          statusEvento: `${item.statusEvento}`,
          ticket: `${item?.ticket}`,
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
          message: 'Evento deletado com sucesso!',
          type: 'success',
        });
      })
    );
  }

  clean() {
    this.eventoSearch.reset();
    this.refresh();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
