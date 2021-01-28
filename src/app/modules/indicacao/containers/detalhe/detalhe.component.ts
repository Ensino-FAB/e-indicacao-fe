import {Component, OnInit} from '@angular/core';
import {of, Subscription, timer} from "rxjs";
import {Indicacao} from "../../../../models/indicacao.model";
import {ActivatedRoute} from "@angular/router";
import {IndicacaoFacade} from "../../indicacao-facade";
import {mapTo, mergeAll, share, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {
  private subs$: Subscription[] = [];
  public isLoading = false;
  public id: number;
  public indicacao: Indicacao;

  constructor(private route: ActivatedRoute, private facade: IndicacaoFacade) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;

      const getOrganizacao$ = this.facade.indicacaoService
        .find(this.id)
        .pipe(share());
      const isLoading$ = of(
        timer(150).pipe(mapTo(true), takeUntil(getOrganizacao$)),
        getOrganizacao$.pipe(mapTo(false))
      ).pipe(mergeAll());

      this.subs$.push(
        isLoading$.subscribe((status) => {
          this.isLoading = status;
        }),
        getOrganizacao$.subscribe((item) => {
          if (item) {
            this.indicacao = item;
          }
        })
      );
    });
  }
}
