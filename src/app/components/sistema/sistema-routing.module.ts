import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './usuario/usuario.component';
import {RolesComponent} from './roles/roles.component';
import {NewComponent} from './roles/new/new.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuario',
        component: UsuarioComponent,
        data: {
          title: 'Usuario',
          status: true
        }
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            component: RolesComponent,
            data: {
              title: 'Roles - Permisos',
              status: true
            },
          },
          {
            path: 'new',
            component: NewComponent,
            data: {
              title: 'Config . Roles - Permisos',
              status: true
            },
          },
          {
            path: 'new/:id',
            component: NewComponent,
            data: {
              title: 'Config . Roles - Permisos',
              status: true
            },
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
