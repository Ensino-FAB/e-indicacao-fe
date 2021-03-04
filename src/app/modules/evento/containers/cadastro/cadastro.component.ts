import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeIn} from '../../../../shared/utils/animation';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventoFacade} from '../../evento-facade';
import {ToastService} from '../../../../shared/services/toast.service';
import {Router} from '@angular/router';
import {SelectOption} from '@cca-fab/cca-fab-components-common/types/select';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [fadeIn()],

})
export class CadastroComponent implements OnInit {
  private subs$: Subscription[] = [];

  eventoForm: FormGroup;

  formId: 'evento-form';

  statusEvento: SelectOption[] = [
    {
      value: 'ABERTO',
      name: 'Evento aberto'
    },
    {
      value: 'FINALIZADO',
      name: 'Evento finalizado'
    }
  ];

  organizacaoGestoraOption: SelectOption[] = [];

  categoriaOption: SelectOption[] = [];


  constructor(
    private eventoFacade: EventoFacade,
    private toast: ToastService,
    private router: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.reloadOrganizacaoGestora();
    // @ts-ignore
    this.reloadCategoria();

    this.eventoForm = this.fb.group({
      id: [''],
      categoriaId: ['', Validators.required],
      codOrganizacaoGestora: ['', Validators.required],
      siglaOrganizacaoGestora: new FormControl('', Validators.required),
      nomeOrganizacaoGestora: new FormControl('', Validators.required),
      descricao: [''],
      nome: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataInicioIndicacao: ['', Validators.required],
      dataTermino: ['', Validators.required],
      dataTerminoIndicacao: ['', Validators.required],
      observacoes: [''],
      sigla: ['', Validators.required],
      statusEvento: ['', Validators.required],
      ticket: [''],
    });
  }

  reloadOrganizacaoGestora(search): void {
    this.organizacaoGestoraOption = [];
    this.subs$.push(
      this.eventoFacade.organizacaoService.findAll(search).subscribe((response) => {
        response.content.map((organizacao) => {
          this.organizacaoGestoraOption.push({
            name: organizacao.nome + ' - ' + organizacao.sigla,
            value: organizacao.id,
          });
        });
      })
    );
  }

  reloadCategoria(search): void {
    this.categoriaOption = [];
    this.subs$.push(
      this.eventoFacade.categoriaService.findAll(search).subscribe((response) => {
        response.content.map((categoria) => {
          this.categoriaOption.push({
            name: categoria.id + ' - ' + categoria.titulo,
            value: categoria.id,
          });
        });
      })
    );
  }

  filterCategoria(event): void {
    const categoriaName: string = event;
    if (categoriaName.length > 1) {
      this.reloadCategoria({titulo: categoriaName});
    }
  }

  filterOrganizacaoGestora(event): void {
    const organizacaoGestoraName: string = event;
    if (organizacaoGestoraName.length > 1) {
      this.reloadOrganizacaoGestora({nome: organizacaoGestoraName});
    }
  }

  onSubmit():
    void {
    if (this.eventoForm.valid
    ) {
      const salvarEvento$ = this.eventoFacade.save(this.eventoForm.value);
      this.subs$.push(salvarEvento$);

      salvarEvento$.subscribe((resp) => {
        this.toast.show({
          message: 'O evento foi salvo com sucesso!',
          type: 'success',
        });
        this.router.navigate(['evento']);
      });
    } else {
      this.toast.show({
        message: 'Erro ao tentar salvar!',
        type: 'alert',
      });
    }
  }

  resetForm():
    void {
    this.eventoForm.reset();
  }
}
