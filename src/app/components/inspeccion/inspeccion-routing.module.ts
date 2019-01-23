import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {NewInspeccionComponent} from './new/new.component';
import {ViewInspeccionComponent} from './list/view/view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'Listado de Inspección',
          status: true
        },
      },
      {
        path: 'new',
        component: NewInspeccionComponent,
        data: {
          title: 'Registrar Inspección',
          status: true
        }
      },
      {
        path: 'view',
        component: ViewInspeccionComponent,
        data: {
          title: 'Ver Inspección',
          status: true
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspeccionRoutingModule {
}
