import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa.model';

@Component({
  selector: 'app-analise',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.scss']
})
export class AnaliseComponent implements OnInit {

  indicados: Pessoa[];

  selecionados: Pessoa[];

  constructor() { }

  ngOnInit(): void {
    this.indicados = [{
      id: 1,
      nome: 'Testando teste 01',
      nrCpf: '012225414545',
      nrOrdem: '6485221',
      siglaPosto: '2T',
      email: 'test@gmail.com'}];
    this.selecionados = [];
  }

}
