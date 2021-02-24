import {Component, OnInit, Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import {fadeInOut} from '../../../../shared/utils/animation';
import {Subscription} from 'rxjs';
import {SelectOption} from '@cca-fab/cca-fab-components-common/types/select';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ToastService} from '../../../../shared/services/toast.service';
import {Router} from '@angular/router';
import {IndicacaoService} from '../../../../services/indicacao.service';

@Component({
  selector: 'app-cadastro-step2',
  templateUrl: './cadastro-step2.component.html',
  styleUrls: ['./cadastro-step2.component.scss'],
  animations: [fadeInOut()],

})
export class CadastroStep2Component implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  @Output() next = new EventEmitter();
  @Output() back = new EventEmitter();
  @Output() voltarAnalise = new EventEmitter();

  itensOptions: SelectOption[] = [];

  @Input() form: FormArray;
  @Input() formInvalid = true;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private router: Router,
    private facade: IndicacaoService
  ) {
  }

  ngOnInit(): void {
    if (this.form.length === 0) {
      this.addFormItem();
    }
  }

  addFormItem(): void {
    const formGroup = this.fb.group({
      observacoes: ['', Validators.required],
      justificativa: ['', Validators.required],

    });
    this.form.push(formGroup);
  }

  removeFormItem(index: number) {
    this.form.removeAt(index);
    if (this.form.controls.length === 0) {
      this.addFormItem();
    }
  }

  onConfirmTree(value: SelectOption, i) {
    this.form.controls[i].get('pessoa').setValue(value);
  }

  blurTree(i) {
    if (!this.form.controls[i].get('pessoa').touched) {
      this.form.controls[i].get('pessoa').markAsTouched();
    }
  }

  onSubmit(): void {
  }

  onNext() {
    this.next.emit(this.form.value);
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
