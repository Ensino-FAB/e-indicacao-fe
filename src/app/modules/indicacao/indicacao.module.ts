import {INDICACAO_ROUTES} from './indicacao-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CadastroComponent} from './containers/cadastro/cadastro.component';
import {ConsultaComponent} from './containers/consulta/consulta.component';
import {RouterModule} from '@angular/router';
import {PrimengComponentsModule} from 'src/app/shared/primeng.components.module';
import {DetalheComponent} from './containers/detalhe/detalhe.component';
import {EdicaoComponent} from './containers/edicao/edicao.component';
import {IndicacaoFacade} from './indicacao-facade';
import {
  AutocompleteModule,
  ButtonModule,
  FormModule,
  IconModule,
  InputModule, LabelModule,
  SelectModule,
  TableModule, TextareaModule
} from "@cca-fab/cca-fab-components-common";
import { AutocompletePessoasComponent } from './components/autocomplete-pessoas/autocomplete-pessoas.component';
import { CadastroStep1Component } from './components/cadastro-step1/cadastro-step1.component';
import { CadastroStep2Component } from './components/cadastro-step2/cadastro-step2.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { DetalheIndicacaoComponent } from './components/detalhe-indicacao/detalhe-indicacao.component';


@NgModule({
  declarations: [CadastroComponent, ConsultaComponent, DetalheComponent, EdicaoComponent, AutocompletePessoasComponent, CadastroStep1Component, CadastroStep2Component, StepperComponent, DetalheIndicacaoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(INDICACAO_ROUTES),
    PrimengComponentsModule,
    ButtonModule,
    IconModule,
    SelectModule,
    FormModule,
    InputModule,
    TableModule,
    LabelModule,
    AutocompleteModule,
    TextareaModule,
  ],
  providers: [IndicacaoFacade],
})
export class IndicacaoModule {
}
