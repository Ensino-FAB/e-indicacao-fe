import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import {ConsultaComponent} from './containers/consulta/consulta.component';
import {EdicaoComponent} from './containers/edicao/edicao.component';
import {DetalheComponent} from './containers/detalhe/detalhe.component';
import {CadastroComponent} from './containers/cadastro/cadastro.component';


export const CATEGORIAS_ROUTES: Routes = [
  {
    path: '',
    component: ConsultaComponent,
    data: { breadcrumb: null },
  },
  {
    path: 'cadastro',
    data: {
      breadcrumb: 'cadastro',
    },
    component: CadastroComponent,
  },

  {
    path: 'editar/:id',
    data: {
      breadcrumb: 'editar',
    },
    component: EdicaoComponent,
  },

  {
    path: 'detalhar/:id',
    data: {
      breadcrumb: 'detalhar',
    },
    component: DetalheComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CategoriasRoutingModule {}
