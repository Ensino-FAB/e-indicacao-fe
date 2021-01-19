import { Component, OnInit } from '@angular/core';
import {fadeIn} from '../../../../shared/utils/animation';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaFacade} from '../categoria-facade';
import {ToastService} from '../../../../shared/services/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeIn()],

})
export class CadastroComponent implements OnInit {
  private subs$: Subscription[] = [];
  categoriaForm: FormGroup;
  formId: 'categoria-form';

  constructor(
    private facade: CategoriaFacade,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaForm = new FormGroup({
      descricao: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const salvarCategoria$ = this.facade.save(
        this.categoriaForm.value
      );
      this.subs$.push(salvarCategoria$);

      salvarCategoria$.subscribe((resp) => {
        this.toast.show({
          message: 'A categoria foi salva com sucesso!',
          type: 'success',
        });
        this.router.navigate(['categoria']);
      });
    } else {
      this.toast.show({
        message: 'Erro ao tentar salvar!',
        type: 'alert',
      });
    }
  }

  resetForm(): void {
    this.categoriaForm.reset();
  }
}
