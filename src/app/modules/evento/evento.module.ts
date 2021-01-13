import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './containers/cadastro/cadastro.component';
import { ConsultaComponent } from './containers/consulta/consulta.component';
import { DetalheComponent } from './containers/detalhe/detalhe.component';
import { EdicaoComponent } from './containers/edicao/edicao.component';



@NgModule({
  declarations: [CadastroComponent, ConsultaComponent, DetalheComponent, EdicaoComponent],
  imports: [
    CommonModule
  ]
})
export class EventoModule { }
