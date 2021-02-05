import { AuthGuard } from './../auth/lib/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'categoria',
    data: {
      breadcrumb: 'categoria',
    },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/categoria/categoria.module').then((m) => m.CategoriasModule),
  },
  {
    path: 'evento',
    data: {
      breadcrumb: 'evento',
    },
    loadChildren: () =>
      import('./modules/evento/evento.module').then((m) => m.EventoModule),
  },
  {
    path: 'indicacao',
    data: {
      breadcrumb: 'indicacao',
    },
    loadChildren: () =>
      import('./modules/indicacao/indicacao.module').then((m) => m.IndicacaoModule),
  },
  {
    path: 'proposta',
    data: {
      breadcrumb: 'proposta',
    },
    loadChildren: () =>
      import('./modules/proposta/proposta.module').then((m) => m.PropostaModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
