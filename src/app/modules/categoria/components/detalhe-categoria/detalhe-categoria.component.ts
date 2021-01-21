import {Component, Input, OnInit} from '@angular/core';
import {Categoria} from '../../../../models/categoria.model';

@Component({
  selector: 'app-detalhe-categoria',
  templateUrl: './detalhe-categoria.component.html',
  styleUrls: ['./detalhe-categoria.component.scss']
})
export class DetalheCategoriaComponent implements OnInit {
  @Input() header: string;
  @Input() categoria: Categoria;
  @Input() loading: boolean;

  constructor() {}

  ngOnInit(): void {}
}
