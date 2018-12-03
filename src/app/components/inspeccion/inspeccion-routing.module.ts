import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ColaboradorComponent} from '../nomina/colaborador/colaborador.component';
import {ListComponent} from './list/list.component';

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
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspeccionRoutingModule { }
