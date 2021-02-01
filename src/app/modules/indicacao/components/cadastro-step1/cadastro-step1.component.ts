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
export class CadastroStep1Component implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  pessoaIdOptions: SelectOption[] = [];
  eventoIdOptions: SelectOption[] = [];
  organizacaoIdOptions: SelectOption[] = [];

  @Output() next = new EventEmitter();
  @Input() form: FormGroup;

  constructor(private facade: IndicacaoFacade) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.reloadPessoaId();
    // @ts-ignore
    this.reloadOrganizacaoId();
  }

  reloadPessoaId(search): void {
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

  reloadOrganizacaoId(search): void {
    this.subs$.push(
      this.facade.organizacaoService.findAll(search).subscribe((response) => {
        response.content.map((organizacao) => {
          this.organizacaoIdOptions.push({
            name: organizacao.nome + ' - ' + organizacao.sigla,
            value: organizacao.id,
          });
        });
      })
    );
  }

  filterOrganizacao(event): void {
    const organizacaoName: string = event;
    if (organizacaoName.length > 2) {
      this.reloadOrganizacaoId({nome: organizacaoName});
    }
  }

  filterPessoa(event): void {
    const pessoaName: string = event;
    if (pessoaName.length > 3) {
      this.reloadPessoaId({nome: pessoaName});
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
