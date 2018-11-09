import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import {AuthGuard} from './shared/services/Auth/auth.guard';
import {AdminGuard} from './shared/services/Auth/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login/simple',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/dashboard.module#DashboardModule',
        data: {title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: '',
        redirectTo: 'simple-page',
        pathMatch: 'full'
      },
      {
        path: 'advance',
        loadChildren: './theme/ui-elements/advance/advance.module#AdvanceModule'
      },
      {
        path: 'catalogo',
        loadChildren: './components/catalogo/catalogo.module#CatalogoModule'
      },
      {
        path: 'nomina',
        loadChildren: './components/nomina/nomina.module#NominaModule'
      },
      {
        path: 'simple-page',
        loadChildren: './theme/simple-page/simple-page.module#SimplePageModule'
      },
      {
        path: 'user',
        loadChildren: './theme/user/user.module#UserModule'
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'coming-soon',
        loadChildren: './theme/coming-soon/coming-soon.module#ComingSoonModule'
      },
      {
        path: 'auth',
        loadChildren: './theme/auth/auth.module#AuthModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
