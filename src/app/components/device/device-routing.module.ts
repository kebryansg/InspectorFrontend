import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {UbicacionComponent} from './ubicacion/ubicacion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'Listado Dispositivos',
          status: true
        }
      },
      {
        path: 'ubicar',
        component: UbicacionComponent,
        data: {
          title: 'Rastrear Dispositivos',
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
export class DeviceRoutingModule { }
