import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  termoBusca: string;
  categorias: [
    {codigo: "string"},
    {titulo: "string"},
    {descricao: "string"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
