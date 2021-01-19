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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
