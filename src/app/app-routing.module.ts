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
    path: 'categorias',
    data: {
      breadcrumb: 'categorias',
    },
    loadChildren: () =>
      import('./modules/categoria/categoria.module').then((m) => m.CategoriasModule),
  },
  {
    path: 'eventos',
    data: {
      breadcrumb: 'eventos',
    },
    loadChildren: () =>
      import('./modules/evento/evento.module').then((m) => m.EventoModule),
  },
  {
    path: 'indicacoes',
    data: {
      breadcrumb: 'indicações',
    },
    loadChildren: () =>
      import('./modules/indicacao/indicacao.module').then((m) => m.IndicacaoModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
