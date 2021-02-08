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
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'categoria',
    data: {
      breadcrumb: 'categoria',
    },
    loadChildren: () =>
      import('./modules/categoria/categoria.module').then((m) => m.CategoriasModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'proposta',
    data: {
      breadcrumb: 'proposta',
    },
    loadChildren: () =>
      import('./modules/proposta/proposta.module').then((m) => m.PropostaModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
