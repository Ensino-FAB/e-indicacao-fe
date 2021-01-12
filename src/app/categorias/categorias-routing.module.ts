import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import {ConsultaComponent} from "./containers/consulta/consulta.component";
import {CadastroComponent} from "./containers/cadastro/cadastro.component";

export const CATEGORIAS_ROUTES: Routes = [
  { path: '', component: ConsultaComponent, data: { breadcrumb: null } },
  { path: 'novo', component: CadastroComponent, data: { breadcrumb: null } },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CategoriasRoutingModule {}
