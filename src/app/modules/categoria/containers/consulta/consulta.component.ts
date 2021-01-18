import { Component, OnInit } from '@angular/core';
import {Categoria} from '../../../../models/categoria.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaService} from "../../../../services/categoria.service";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  termoBusca: string;
  options: string[] = ['Detalhar', 'Editar', 'Excluir'];
  selectedOption: string;
  categorias: Categoria[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.buscaCategorias();
  }

  // tslint:disable-next-line:typedef
  novaCategoria(){
    this.router.navigate(['criar'], { relativeTo: this.route });
  }

  buscaCategorias(){
    // @ts-ignore
    this.categoriaService.findAll().subscribe(response => this.categorias = response.content);
  }

}
