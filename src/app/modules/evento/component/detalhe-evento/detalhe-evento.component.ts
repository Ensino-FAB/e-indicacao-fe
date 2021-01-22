import {Component, Input, OnInit} from '@angular/core';
import {Evento} from "../../../../models/evento.model";

@Component({
  selector: 'app-detalhe-evento',
  templateUrl: './detalhe-evento.component.html',
  styleUrls: ['./detalhe-evento.component.scss']
})
export class DetalheEventoComponent implements OnInit {
  @Input() header: string;
  @Input() evento: Evento;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
