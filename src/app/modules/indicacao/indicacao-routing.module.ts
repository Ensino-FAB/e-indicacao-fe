import {CadastroComponent} from './../indicacao/containers/cadastro/cadastro.component';
import {ConsultaComponent} from './../indicacao/containers/consulta/consulta.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes} from '@angular/router';


export const INDICACAO_ROUTES: Routes = [
  {path: '', component: ConsultaComponent, data: {breadcrumb: null}},
  {path: 'criar', component: CadastroComponent, data: {breadcrumb: null}}
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class IndicacaoRoutingModule {
}
