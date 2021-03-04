import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {fadeIn} from "../../../../shared/utils/animation";
import {Subscription} from "rxjs";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";
import {Evento, StatusEvento} from "../../../../models/evento.model";
import {Categoria} from "../../../../models/categoria.model";
import {SelectOption} from "@cca-fab/cca-fab-components-common/types/select";
import {EventoFacade} from "../../evento-facade";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss'],
  animations: [fadeIn()]
})
export class EdicaoComponent implements OnInit, OnDestroy, AfterViewChecked {

  private subs$: Subscription[] = [];
  private id: number;
  private isLoading = false;
  eventoForm: FormGroup;
  formId: 'evento-form';
  evento: Evento;

  statusEvento: SelectOption[] =[
    {
      value: 'ABERTO',
      name: 'Evento aberto'
    },
    {
      value: 'FINALIZADO',
      name: 'Evento finalizado'
    }
  ]

  constructor(
    private router: Router,
    private facade: EventoFacade,
    private toast: ToastService,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.eventoForm = new FormGroup({
      id: new FormControl(''),
      categoria: new FormControl({disabled:true}, Validators.required),
      categoriaId: new FormControl('', Validators.required),
      codOrganizacaoGestora: new FormControl('', Validators.required),
      siglaOrganizacaoGestora: new FormControl('', Validators.required),
      nomeOrganizacaoGestora: new FormControl('', Validators.required),
      descricao: new FormControl(''),
      nome: new FormControl('', Validators.required),
      dataInicio: new FormControl(''),
      dataInicioIndicacao: new FormControl(''),
      dataTermino: new FormControl(''),
      dataTerminoIndicacao: new FormControl(''),
      observacoes: new FormControl(''),
      sigla: new FormControl('', Validators.required),
      statusEvento: new FormControl(''),
      ticket: new FormControl('', Validators.required),
      organizacaoResponse: new FormControl({disabled: true})
    });
    this.subs$.push(
      this.activeRoute.params.subscribe((params) => (this.id = params.id)),
      this.facade
        .findEvento(this.id)
        .subscribe((resp) => {
          this.eventoForm.setValue(
            {
              ...resp,
              categoria: resp.categoria.titulo,
              organizacaoResponse: resp.organizacaoResponse.nome
            })
        })
  );
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      this.subs$.push(
        this.facade.save(this.eventoForm.value).subscribe((resp) => {
          this.toast.show({
            message: 'O evento foi editado com sucesso!',
            type: 'success',
          });
          this.router.navigate(['evento']);
        })
      );
    } else {
      this.toast.show({
        message: 'Erro ao tentar editar o evento!',
        type: 'alert',
      });
    }
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngAfterViewChecked(): void {
    const statusEvento = this.eventoForm.get('statusEvento').value;
    this.eventoForm.get('statusEvento').setValue(statusEvento);
  }

}
