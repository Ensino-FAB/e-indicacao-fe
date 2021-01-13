import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../../../models/categoria.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  termoBusca: string;
  options: string[] = ['Detalhar','Editar','Excluir'];
  selectedOption: string;
  categorias: Categoria[] = [
    {id:0,codigo:"test1",titulo:"abc",descricao:"asdf"},
    {id:1,codigo:"test2",titulo:"def",descricao:"rere"},
    {id:2,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:3,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:4,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:5,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:6,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:7,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:8,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:9,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:10,codigo:"test3",titulo:"ght",descricao:"cvxcv"},
    {id:11,codigo:"test3",titulo:"ght",descricao:"cvxcv"}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  novaCategoria(){
    this.router.navigate(['criar'], { relativeTo: this.route });
  }

}
