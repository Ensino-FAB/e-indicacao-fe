import {Component, OnDestroy, OnInit} from '@angular/core';
import {fadeIn} from "../../../../shared/utils/animation";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EventoFacade} from "../evento-facade";
import {ToastService} from "../../../../shared/services/toast.service";
import {Evento, StatusEvento} from "../../../../models/evento.model";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss'],
  animations: [fadeIn()]
})
export class EdicaoComponent implements OnInit, OnDestroy {

  private subs$: Subscription[] = [];
  private id: number;
  private isLoading = false;
  eventoForm: FormGroup;
  formId: 'evento-form';

  evento: Evento;

  constructor(
    private router: Router,
              private facade: EventoFacade,
              private toast: ToastService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventoForm = new FormGroup({
      id: new FormControl(''),
      categoriaId: new FormControl('',Validators.required),
      codOrganizacaoGestora: new FormControl('',Validators.required),
      descricao: new FormControl(''),
      nome: new FormControl('',Validators.required),
      dataInicio: new FormControl(''),
      dataInicioIndicacao: new FormControl(''),
      dataTermino: new FormControl(''),
      dataTerminoIndicacao: new FormControl(''),
      observacoes: new FormControl(''),
      sigla: new FormControl('',Validators.required),
      statusEvento: new FormControl('',Validators.required),
      ticket: new FormControl('',Validators.required),
    });
    this.subs$.push(
      this.activeRoute.params.subscribe((params) => (this.id = params.id)),
      this.facade
        .findEvento(this.id)
        .subscribe((resp) => {
          this.eventoForm.patchValue(resp)
        })
    );
  }

  onSubmit(): void {

    console.log(this.eventoForm.value)
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

}
