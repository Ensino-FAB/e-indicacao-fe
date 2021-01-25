import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PropostaFacade } from './containers/proposta-facade';
import { PROPOSTA_ROUTES } from './proposta-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnaliseComponent } from './containers/analise/analise.component';
import { ConsultaComponent } from './containers/consulta/consulta.component';
import { RouterModule } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/shared/primeng.components.module';
import { CardParticipantDetailComponent } from './components/card-participant-detail/card-participant-detail.component';



@NgModule({
  declarations: [AnaliseComponent, ConsultaComponent, CardParticipantDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PROPOSTA_ROUTES),
    PrimengComponentsModule,
  ],
  providers: [PropostaFacade]
})
export class PropostaModule { }
