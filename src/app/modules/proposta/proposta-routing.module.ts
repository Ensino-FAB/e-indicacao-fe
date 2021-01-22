import { ConsultaComponent } from './containers/consulta/consulta.component';
import { AnaliseComponent } from './containers/analise/analise.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes} from '@angular/router';


export const PROPOSTA_ROUTES: Routes = [
  {path: '', component: ConsultaComponent, data: {breadcrumb: null}},
  {path: 'evento/:id', component: AnaliseComponent, data: {breadcrumb: null}}
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class PropostaRoutingModule {
}
