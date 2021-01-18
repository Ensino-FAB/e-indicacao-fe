import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Categoria} from "../../../../models/categoria.model";
import {CategoriaService} from "../../../../services/categoria.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'],
  providers: [MessageService]
})
export class CategoriaFormComponent implements OnInit, OnDestroy {

  private subs$: Subscription[] = [];
  categoriaForm: FormGroup;
  formId: 'categoria-form';
  @Input() data: Observable<Categoria>;

  constructor(private categoriaService: CategoriaService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.categoriaForm = new FormGroup({
      id: new FormControl(''),
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      imageURL: new FormControl('', Validators.required),
    });

    if (this.data) {
      this.subs$.push(
        this.data.subscribe((resp) => this.categoriaForm.patchValue({ ...resp }))
      );
    }
  }

  onSubmit(): void {
    console.log(this.categoriaForm.value)
    if (this.categoriaForm.get('titulo').valid) {
      this.subs$.push(
        this.categoriaService.save(this.categoriaForm.value).subscribe((resp) => {
          this.messageService.add({
            summary: 'Sucesso',
            detail: 'A capacitação foi salva com sucesso!',
            severity: 'success',
          });
          //this.router.navigate(['categorias', 'consultar']);
        })
      );
    } else {
      this.messageService.add({
        summary: 'Atenção!',
        detail: 'Erro ao tentar salvar a categoria!',
        severity: 'warn',
      });
    }
  }

  resetForm(): void {
    this.categoriaForm.reset();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
