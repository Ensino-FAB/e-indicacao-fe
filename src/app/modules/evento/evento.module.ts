/* tslint:disable:no-trailing-whitespace */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './containers/cadastro/cadastro.component';
import { ConsultaComponent } from './containers/consulta/consulta.component';
import { DetalheComponent } from './containers/detalhe/detalhe.component';
import { EdicaoComponent } from './containers/edicao/edicao.component';

import {RouterModule} from '@angular/router';
import {PrimengComponentsModule} from '../../shared/primeng.components.module';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {EVENTOS_ROUTES} from './evento-routing.module';
import {
  AutocompleteModule,
  ButtonModule,
  IconModule,
  TableModule,
  FormModule,
  SelectModule,
  InputModule,
  CardModule,
  LabelModule,
  TextareaModule,
} from '@cca-fab/cca-fab-components-common';
import {EventoFacade} from './evento-facade';
import {DetalheEventoComponent} from './components/detalhe-evento/detalhe-evento.component';


@NgModule({
  declarations: [
    CadastroComponent,
    ConsultaComponent,
    DetalheComponent,
    EdicaoComponent,
    DetalheEventoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EVENTOS_ROUTES),
    PrimengComponentsModule,
    MultiSelectModule,
    AutoCompleteModule,
    FormModule,
    InputModule,
    ButtonModule,
    TableModule,
    IconModule,
    SelectModule,
    CardModule,
    LabelModule,
    TextareaModule,
    AutocompleteModule,
  ],
  providers: [EventoFacade],
})
export class EventoModule { }
