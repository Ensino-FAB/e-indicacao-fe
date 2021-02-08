import {Component, Input, OnInit} from '@angular/core';
import {Indicacao} from "../../../../models/indicacao.model";
import {IndicacaoFacade} from "../../indicacao-facade";
import {Evento} from "../../../../models/evento.model";
import {ActivatedRoute} from "@angular/router";
import {fadeIn} from "../../../../shared/utils/animation";

@Component({
  selector: 'app-detalhe-indicacao',
  templateUrl: './detalhe-indicacao.component.html',
  styleUrls: ['./detalhe-indicacao.component.scss'],
  animations: [fadeIn()],

})
export class DetalheIndicacaoComponent implements OnInit {
  @Input() header: string;
  @Input() indicacao: Indicacao;
  @Input() loading: boolean;
  public id: number;
  public evento: Evento;


  constructor(private facade: IndicacaoFacade,   private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idEvento;
    this.buscarEvento();
  }


  buscarEvento() {
    this.facade.eventoService.findById(this.id).subscribe((response) => {
      this.evento = response;
    });
  }

}
