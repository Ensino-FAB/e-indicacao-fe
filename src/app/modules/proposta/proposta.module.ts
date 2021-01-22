import { PROPOSTA_ROUTES } from './proposta-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnaliseComponent } from './containers/analise/analise.component';
import { ConsultaComponent } from './containers/consulta/consulta.component';
import { RouterModule } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/shared/primeng.components.module';



@NgModule({
  declarations: [AnaliseComponent, ConsultaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PROPOSTA_ROUTES),
    PrimengComponentsModule,
  ]
})
export class PropostaModule { }
