import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Subscription} from "rxjs";
import {SelectOption} from "@cca-fab/cca-fab-components-common/types/select";
import {FormGroup} from "@angular/forms";
import {IndicacaoFacade} from "../../indicacao-facade";
import {EventoSearchModel} from "../../../../models/evento-search.model";

@Component({
  selector: 'app-cadastro-step1',
  templateUrl: './cadastro-step1.component.html',
  styleUrls: ['./cadastro-step1.component.scss']
})
export class CadastroStep1Component implements OnInit , OnDestroy{
  private subs$: Subscription[] = [];
  pessoaIdOptions: SelectOption[] = [];
  eventoIdOptions: SelectOption[] = [];

  @Output() next = new EventEmitter();
  @Input() form: FormGroup;

  constructor(private facade: IndicacaoFacade) {}

  ngOnInit(): void {
    // @ts-ignore
    this.reloadEventoId();
    // @ts-ignore
    this.reloadPessoaId();
  }

  reloadEventoId (search): void {
    this.eventoIdOptions = [];
    this.subs$.push(
      this.facade.eventoService.findAll(search).subscribe((response) => {
        response.content.map((evento) => {
          this.eventoIdOptions.push({
            name: evento.nome + ' - ' + evento.statusEvento,
            value: evento.id,
          });
        });
      })
    );
  }

  reloadPessoaId (search): void {
    this.pessoaIdOptions = [];
    this.subs$.push(
      this.facade.pessoaService.findAll(search).subscribe((response) => {
        response.content.map((pessoa) => {
          this.pessoaIdOptions.push({
            name: pessoa.nome + ' - ' + pessoa.nrCpf,
            value: pessoa.id,
          });
        });
      })
    );
  }

  filterEvento(event): void {
    const eventoName: string = event;
    if (eventoName.length > 2) {
      this.reloadEventoId({ nome: eventoName });
    }
  }

  filterPessoa(event1): void {
    const pessoaName: string = event1;
    if (pessoaName.length > 2) {
      this.reloadPessoaId({ nome: pessoaName });
    }
  }

  onSubmit(): void {}

  onNext() {
    this.next.emit(this.form.value);
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
