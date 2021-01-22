import { INDICACAO_ROUTES } from './indicacao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './containers/cadastro/cadastro.component';
import { ConsultaComponent } from './containers/consulta/consulta.component';
import { RouterModule } from '@angular/router';
import { PrimengComponentsModule } from 'src/app/shared/primeng.components.module';
import { DetalheComponent } from './containers/detalhe/detalhe.component';
import { EdicaoComponent } from './containers/edicao/edicao.component';



@NgModule({
  declarations: [CadastroComponent, ConsultaComponent, DetalheComponent, EdicaoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(INDICACAO_ROUTES),
    PrimengComponentsModule,
  ]
})
export class IndicacaoModule { }
