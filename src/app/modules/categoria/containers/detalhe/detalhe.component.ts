import {Component, OnInit} from '@angular/core';
import {of, Subscription, timer} from 'rxjs';
import {Categoria} from '../../../../models/categoria.model';
import {ActivatedRoute} from '@angular/router';
import {CategoriaFacade} from '../../categoria-facade';
import {mapTo, mergeAll, share, takeUntil, tap} from 'rxjs/operators';
import {fadeIn} from '../../../../shared/utils/animation';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss'],
  animations: [fadeIn()],

})
export class DetalheComponent implements OnInit {

  private subs$: Subscription[] = [];
  public isLoading = false;
  public id: number;
  public categoria: Categoria;

  constructor(
    private route: ActivatedRoute,
    private facade: CategoriaFacade
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;

      const getCategoria$ = this.facade
        .findCategoria(this.id)
        .pipe(share());

      const isLoading$ = of(
        timer(150).pipe(mapTo(true), takeUntil(getCategoria$)),
        getCategoria$.pipe(mapTo(false))
      ).pipe(mergeAll());

      this.subs$.push(
        isLoading$.subscribe((status) => {
          this.isLoading = status;
        }),
        getCategoria$.subscribe((item) => {
          if (item) {
            this.categoria = item;
          }
        })
      );
    });
  }
}
