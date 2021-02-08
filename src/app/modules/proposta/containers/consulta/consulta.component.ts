import { PropostaFacade } from './../proposta-facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription, timer } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { TableColumn } from '@cca-fab/cca-fab-components-common';
import { mapTo, mergeAll, share, takeUntil } from 'rxjs/operators';
import { ToastService } from '../../../../shared/services/toast.service';
import { fadeIn } from '../../../../shared/utils/animation';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  animations: [fadeIn()],

})
export class ConsultaComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  isLoading = false;

  propostaSearch = new FormGroup({
    q: new FormControl(''),
    descricao: new FormControl(''),
    titulo: new FormControl(''),
  });

  columns: TableColumn[] = [
    {
      field: 'id',
      title: 'Código',
      width: '10%',
    },

    {
      field: 'evento',
      title: 'Evento',
      width: '25%',
    },

    {
      field: 'dataInclusao',
      title: 'Data Inclusão',
      width: '25%',
    },

    {
      field: 'observacoes',
      title: 'Observações',
      width: '25%',
    },

    {
      field: 'status',
      title: 'Status',
      width: '25%',
    },

  ];

  data = [];
  loadindMockData = new Array(10).fill({
    id: '',
    evento: '',
    dataInclusao: '',
    observacoes: '',
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
    private facade: PropostaFacade,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.options = [
      { name: 'Codigo', value: 'id' },
      { name: 'Evento', value: 'evento' },
      { name: 'Data de Inclusão', value: 'dataInclusao' },
      { name: 'Observações', value: 'observacoes' },
      { name: 'Status', value: 'status' },

    ];
    this.refresh();
  }

  refresh(): void {
    const search = {
      ...this.propostaSearch.value,
      page: this.page ? this.page - 1 : 0,
      size: this.pageSize,
      sort: this.orderBy.map((item) => (this.asc ? item : item + ',desc')),
    };
    const getProposta$ = this.facade.findAllPropostas(search).pipe(share());
    const isLoading$ = of(
      timer(150).pipe(mapTo(true), takeUntil(getProposta$)),
      getProposta$.pipe(mapTo(false))
    ).pipe(mergeAll());

    this.subs$.push(
      isLoading$.subscribe((status) => {
        this.isLoading = status;
      }),
      getProposta$.subscribe((res) => {
        this.count = res.totalElements;
        this.data = res.content.map((item) => ({
          id: `${item?.id}`,
          evento: `${item?.evento.nome}`,
          dataInclusao: `${item?.id}`,
          observacoes: `${item?.id}`,
          status: `${item?.id}`,
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
      this.facade.deleteProposta(id).subscribe(() => {
        this.refresh();
        this.toastService.show({
          message: 'Categoria deletada com sucesso!',
          type: 'success',
        });
      })
    );
  }

  clean(): void {
    this.propostaSearch.reset();
    this.refresh();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
