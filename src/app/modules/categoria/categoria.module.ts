import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CATEGORIAS_ROUTES } from './categorias-routing.module';
import { PrimengComponentsModule } from '../../shared/primeng.components.module';
import { ConsultaComponent } from './containers/consulta/consulta.component';
import { CadastroComponent } from './containers/cadastro/cadastro.component';
import { EdicaoComponent } from './containers/edicao/edicao.component';
import { DetalheComponent } from './containers/detalhe/detalhe.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import {ButtonModule, FormModule, InputModule, TextareaModule} from "@cca-fab/cca-fab-components-common";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    ConsultaComponent,
    CadastroComponent,
    EdicaoComponent,
    DetalheComponent,
    CategoriaFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CATEGORIAS_ROUTES),
    PrimengComponentsModule,
    MultiSelectModule,
    AutoCompleteModule,
    FormModule,
    InputModule,
    TextareaModule,
    ButtonModule,
    ToastModule
  ],
})
export class CategoriasModule {}
