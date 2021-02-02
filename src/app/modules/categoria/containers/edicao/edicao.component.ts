import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../shared/services/toast.service";
import {CategoriaFacade} from "../../categoria-facade";
import {ActivatedRoute, Router} from "@angular/router";
import {fadeIn} from "../../../../shared/utils/animation";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss'],
  animations: [fadeIn()],

})
export class EdicaoComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  public categoriaForm: FormGroup;
  public formId: 'categoria-form';
  private id: number;

  constructor(
    private facade: CategoriaFacade,
    private toast: ToastService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoriaForm = new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
    });

    this.subs$.push(
      this.activeRoute.params.subscribe((params) => (this.id = params.id)),
      this.facade
        .findCategoria(this.id)
        .subscribe((resp) => this.categoriaForm.setValue(resp))
    );
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      this.subs$.push(
        this.facade
          .save(this.categoriaForm.value)
          .subscribe((resp) => {
            this.toast.show({
              message: 'A Categoria foi editada com sucesso!',
              type: 'success',
            });
            this.router.navigate(['categoria']);
          })
      );
    } else {
      this.toast.show({
        message: 'Erro ao tentar editar a atividade complementar!',
        type: 'alert',
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
