import { PessoaIndicada } from 'src/app/models/pessoa.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-participante',
  templateUrl: './item-participante.component.html',
  styleUrls: ['./item-participante.component.scss']
})
export class ItemParticipanteComponent implements OnInit {

  @Input() pessoa: PessoaIndicada;

  constructor() { }

  ngOnInit(): void {
  }

}
