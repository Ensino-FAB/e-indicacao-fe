import { ItemPropostaResponse } from './../../../../models/item-proposta.model';
import { Component, Input, OnInit } from '@angular/core';
import {IndicacaoService} from "../../../../services/indicacao.service";
import {Indicacao} from "../../../../models/indicacao.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-item-participante',
  templateUrl: './item-participante.component.html',
  styleUrls: ['./item-participante.component.scss']
})
export class ItemParticipanteComponent implements OnInit {

  @Input() item: ItemPropostaResponse;

  constructor( private service: IndicacaoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
