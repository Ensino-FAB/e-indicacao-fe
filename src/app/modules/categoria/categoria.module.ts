import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CATEGORIAS_ROUTES} from './categorias-routing.module';
import {PrimengComponentsModule} from '../../shared/primeng.components.module';
import {ConsultaComponent} from './containers/consulta/consulta.component';
import {EdicaoComponent} from './containers/edicao/edicao.component';
import {DetalheComponent} from './containers/detalhe/detalhe.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {
  ButtonModule,
  IconModule,
  TableModule,
  FormModule,
  SelectModule,
  InputModule,
} from '@cca-fab/cca-fab-components-common';
import {CategoriaFacade} from './containers/categoria-facade';
import { CadastroComponent } from './containers/cadastro/cadastro.component';

@NgModule({
  declarations: [
    ConsultaComponent,
    EdicaoComponent,
    DetalheComponent,
    CadastroComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CATEGORIAS_ROUTES),
    PrimengComponentsModule,
    MultiSelectModule,
    AutoCompleteModule,
    FormModule,
    InputModule,
    ButtonModule,
    TableModule,
    IconModule,
    SelectModule
  ],
  providers: [CategoriaFacade],
})
export class CategoriasModule {
}
