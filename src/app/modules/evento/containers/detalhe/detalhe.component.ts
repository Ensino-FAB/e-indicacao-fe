import { Component, OnInit } from '@angular/core';
import {of, Subscription, timer} from "rxjs";
import {Evento} from "../../../../models/evento.model";
import {ActivatedRoute} from "@angular/router";
import {EventoFacade} from "../evento-facade";
import {mapTo, mergeAll, share, takeUntil} from "rxjs/operators";
import {fadeIn} from "../../../../shared/utils/animation";

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss'],
  animations: [fadeIn()]
})
export class DetalheComponent implements OnInit {

  private subs$: Subscription[] = [];
  public isLoading = false;
  public id: number;
  public evento: Evento;

  constructor(private route: ActivatedRoute,
              private eventoFacade: EventoFacade) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;

      const getEvento$ = this.eventoFacade
        .findEvento(this.id)
        .pipe(share());

      const isLoading$ = of(
        timer(150).pipe(mapTo(true), takeUntil(getEvento$)),
        getEvento$.pipe(mapTo(false))
      ).pipe(mergeAll());

      this.subs$.push(
        isLoading$.subscribe((status) => {
          this.isLoading = status;
        }),
        getEvento$.subscribe((item) => {
          if (item) {
            this.evento = item;
          }
        })
      );
    });
  }

}
