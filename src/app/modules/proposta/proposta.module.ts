import { ItemParticipanteComponent } from './components/item-participante/item-participante.component';
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
import {
  CardModule,
  ButtonModule as ButtonModuleCCA,
  IconModule as IconModuleCCA,
  TableModule as TableModuleCCA,
  LabelModule as LabelModuleCCA,
  FormModule as FormModuleCCA,
  SelectModule as SelectModuleCCA,
  TextareaModule as TextareaModuleCCA,
  InputModule as InputModuleCCA,
} from '@cca-fab/cca-fab-components-common';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [AnaliseComponent, ConsultaComponent, CardParticipantDetailComponent, ItemParticipanteComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(PROPOSTA_ROUTES),
        PrimengComponentsModule,
        ButtonModuleCCA,
        IconModuleCCA,
        TableModuleCCA,
        LabelModuleCCA,
        FormModuleCCA,
        SelectModuleCCA,
        TextareaModuleCCA,
        InputModuleCCA,
        MessageModule,
    ],
  providers: [PropostaFacade]
})
export class PropostaModule { }
