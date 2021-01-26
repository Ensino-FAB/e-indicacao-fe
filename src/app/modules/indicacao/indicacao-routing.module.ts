import {CadastroComponent} from './../indicacao/containers/cadastro/cadastro.component';
import {ConsultaComponent} from './../indicacao/containers/consulta/consulta.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes} from '@angular/router';
import {EdicaoComponent} from "./containers/edicao/edicao.component";
import {DetalheComponent} from "./containers/detalhe/detalhe.component";


export const INDICACAO_ROUTES: Routes = [
  {
    path: 'evento/:id',
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
export class IndicacaoRoutingModule {
}
