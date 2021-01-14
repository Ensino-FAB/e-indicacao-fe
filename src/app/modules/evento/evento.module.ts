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



@NgModule({
  declarations: [CadastroComponent, ConsultaComponent, DetalheComponent, EdicaoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EVENTOS_ROUTES),
    PrimengComponentsModule,
    MultiSelectModule,
    AutoCompleteModule,
  ],
})
export class EventoModule { }
