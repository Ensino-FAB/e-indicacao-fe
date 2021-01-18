import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Categoria} from "../../../../models/categoria.model";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CategoriaService} from "../../../../services/categoria.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  categoriaForm: FormGroup;
  data: Observable<Categoria>;
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.data = this.categoriaService.find(this.id);
    }
  }

  resetForm(): void {
    this.categoriaForm.reset();
  }

}
