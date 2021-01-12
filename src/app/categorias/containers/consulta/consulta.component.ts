import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../../models/categoria.model";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  termoBusca: string;
  categorias: Categoria[] = [
    {id:0,codigo:"test1",titulo:"test1",descricao:"asdf"},
    {id:1,codigo:"test2",titulo:"test2",descricao:"asdf"},
    {id:2,codigo:"test3",titulo:"test3",descricao:"asdf"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  novaCategoria(){
    console.log("ir para nova categoria");
  }

}
