import {Pessoa} from './../../../../models/pessoa.model';
import {Component, OnInit} from '@angular/core';
import {fadeIn} from 'src/app/shared/utils/animation';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IndicacaoFacade} from "../../indicacao-facade";
import {Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";
import {Indicacao} from "../../../../models/indicacao.model";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeIn()],
})
export class CadastroComponent implements OnInit {
  form: FormGroup;

  currentStep = 1;
  statusMap = {first: 'active', second: 'disabled'};

  constructor(
    private fb: FormBuilder,
    private facade: IndicacaoFacade,
    private router: Router,
    private toast: ToastService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      codOrganizacaoBeneficiada: ['', Validators.required],
      codOrganizacaoSolicitante: ['', Validators.required],
      justificativa: ['', Validators.required],
      observacoes: [''],
      eventoId: [''],
      codPessoa: [''],

    });
  }

  newFin() {
    window.location.reload();
  }

  cleanForm() {
  }

  onStepperClick(step: number) {
    const keys = Object.keys(this.statusMap);

    if (keys[step - 1] !== 'disabled' && this.currentStep < 3) {
      this.currentStep = step;
    }
  }

  nextStep() {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });

    const CHANGE_MAP = ['first', 'second'];

    if (this.currentStep < 2) {
      this.statusMap[CHANGE_MAP[this.currentStep - 1]] = 'checked';
      ++this.currentStep;
    } else if (this.currentStep === 2) {
      const requestBody: Indicacao = {
        id: 0,
        codOrganizacaoBeneficiada: this.form.get('codOrganizacaoBeneficiada').value,
        codOrganizacaoSolicitante: this.form.get('codOrganizacaoSolicitante').value,
        justificativa: this.form.get('justificativa').value,
        observacoes: this.form.get('observacoes').value,
        eventoId: this.form.get('eventoId').value,
        codPessoa: this.form.get('codPessoa').value,
      };
      this.facade.indicacaoService
        .create(requestBody)
        .subscribe((indicacao) => {
          this.toast.show({
            message: 'A Indicação foi salva com sucesso!',
            type: 'success',
          });
          this.router.navigate(['']);
        });
    }
  }

  previousStep() {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });

    --this.currentStep;
  }
}
