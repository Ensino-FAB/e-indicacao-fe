import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription, timer} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {TableColumn} from '@cca-fab/cca-fab-components-common';
import {EventoFacade} from '../../evento-facade';
import {mapTo, mergeAll, share, takeUntil} from 'rxjs/operators';
import {ToastService} from '../../../../shared/services/toast.service';
import {fadeIn} from '../../../../shared/utils/animation';
import {SelectOption} from '@cca-fab/cca-fab-components-common/types/select';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  animations: [fadeIn()],

})
export class ConsultaComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  isLoading = false;

  eventoSearch = new FormGroup({
    q: new FormControl(''),
    nome: new FormControl(''),
    sigla: new FormControl(''),
    statusEvento: new FormControl(''),
    categoriaTitulo: new FormControl(''),
    siglaOrganizacaoGestora: new FormControl('')

  });

  columns: TableColumn[] = [
    {
      field: 'sigla',
      title: 'Sigla',
      width: '10%',
    },
    {
      field: 'nome',
      title: 'Nome',
      width: '25%',
    },
    {
      field: 'categoriaTitulo',
      title: 'Categoria',
      width: '15%',
    },
    {
      field: 'siglaOrganizacaoGestora',
      title: 'Organização Gestora',
      width: '15%',
    },
    {
      field: 'statusEvento',
      title: 'Status',
      width: '10%',
    },
  ];

  data = [];
  loadindMockData = new Array(10).fill({
    sigla: '',
    nome: '',
    categoriaTitulo: '',
    siglaOrganizacaoGestora: '',
    statusEvento: '',
  });

  options: object[];
  filterOptions: object[];
  asc = true;
  pageSize = 20;
  page = 1;
  count: number;
  orderBy: string[] = ['id'];
  totalPages = 1;
  eventoOptions: SelectOption[] = [];
  categoriaOptions: SelectOption[] = [];
  statusOptions: SelectOption[] = [];

  constructor(
    private facade: EventoFacade,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.statusOptions = [
      { name: 'Evento Aberto', value: 'ABERTO' },
      { name: 'Evento Finalizado', value: 'FINALIZADO' },
    ];
    this.options = [
      {name: 'Categoria', value: 'categoriaTitulo'},
      {name: 'Organização Gestora', value: 'siglaOrganizacaoGestora'},
      {name: 'Nome', value: 'nome'},
      {name: 'Sigla', value: 'sigla'},
      {name: 'Status', value: 'statusEvento'},
      // {name: 'Descrição', value: 'descricao'},
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
        this.isLoading = status;
      }),
      getEvento$.subscribe((res) => {
        this.count = res.totalElements;
        this.data = res.content.map((item) => ({
          id: `${item?.id}`,
          categoriaId: `${item.categoriaId}`,
          categoriaTitulo: `${item.categoria.titulo}`,
          codOrganizacaoGestora: `${item.codOrganizacaoGestora}`,
          siglaOrganizacaoGestora: `${item.siglaOrganizacaoGestora}`,
          nomeOrganizacaoGestora: `${item.nomeOrganizacaoGestora}`,
          // organizacaoGestoraSigla: `${item.organizacaoResponse.sigla}`,
          dataInicio: `${item.dataInicio}`,
          dataInicioIndicacao: `${item?.dataInicioIndicacao}`,
          dataTermino: `${item.dataTermino}`,
          dataTerminoIndicacao: `${item.dataTerminoIndicacao}`,
          // descricao: `${item.descricao}`,
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

  handleSortChange(a): void {
    this.page = 1;
    if (a === null) {
      this.orderBy = ['id'];
    } else {
      this.orderBy = [a];
    }
    this.refresh();
  }

  handleInvertSort(): void {
    this.asc = !this.asc;
    this.refresh();
  }

  onSubmit(): void {
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

  clean(): void {
    this.eventoSearch.reset();
    this.refresh();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

}
