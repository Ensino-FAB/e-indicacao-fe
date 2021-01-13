import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {CATEGORIAS_ROUTES} from "./categorias-routing.module";
import {PrimengComponentsModule} from "../../shared/primeng.components.module";
import { ConsultaComponent } from './containers/consulta/consulta.component';
import { CadastroComponent } from './containers/cadastro/cadastro.component';
import { EdicaoComponent } from './containers/edicao/edicao.component';
import { DetalheComponent } from './containers/detalhe/detalhe.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [ConsultaComponent, CadastroComponent, EdicaoComponent, DetalheComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CATEGORIAS_ROUTES),
    PrimengComponentsModule,
  ]
})
export class CategoriasModule { }
