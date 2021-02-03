import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeIn} from "../../../../shared/utils/animation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";
import {IndicacaoFacade} from "../../indicacao-facade";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss'],
  animations: [fadeIn()],

})
export class EdicaoComponent implements OnInit, OnDestroy {
  indicacaoForm: FormGroup;
  private subs$: Subscription[] = [];
  public id: number;
  formId: 'indicacao-form';

  constructor(
    private fb: FormBuilder,
    private facade: IndicacaoFacade,
    private router: Router,
    private toast: ToastService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {


    this.indicacaoForm = this.formBuilder.group({
      id: ['', Validators.required],
      justificativa: ['', Validators.required],
      observacoes: ['', Validators.required],
    });

    this.subs$.push(
      this.activeRoute.params.subscribe((params) => (this.id = params.id)),
      this.facade.indicacaoService
        .find(this.id)
        .subscribe((resp) => this.indicacaoForm.setValue(resp))
    );
  }

  onSubmit(): void {
    if (this.indicacaoForm.valid) {
      this.subs$.push(
        this.facade.indicacaoService
          .update(this.indicacaoForm.value)
          .subscribe(() => {
            this.toast.show({
              message: 'A conclusão foi editada com sucesso!',
              type: 'success',
            });
            this.router.navigate(['evento']);
          })
      );
    } else {
      this.toast.show({
        message: 'Erro ao tentar editar a Conclusão!',
        type: 'alert',
      });
    }
  }

  resetForm(): void {
    this.indicacaoForm.reset();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
