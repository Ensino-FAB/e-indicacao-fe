import { Pessoa } from './../../../../models/pessoa.model';
import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/shared/utils/animation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeIn()],
})
export class CadastroComponent implements OnInit {

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
