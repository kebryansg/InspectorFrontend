import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './usuario/usuario.component';
import {RolesComponent} from './roles/roles.component';
import { NewRolComponent } from './roles/new/new.component';
import {NewUsuarioComponent} from './usuario/new/new.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuario',
        children: [
          {
            path: '',
            component: UsuarioComponent,
            data: {
              title: 'Usuario',
              status: true
            }
          },
          {
            path: 'new',
            component: NewUsuarioComponent,
            data: {
              title: 'Config. Usuario',
              status: true
            },
          },
          {
            path: 'new/:id',
            component: NewUsuarioComponent,
            data: {
              title: 'Config. Usuario',
              status: true
            },
          }
        ]
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
            component: NewRolComponent,
            data: {
              title: 'Config . Roles - Permisos',
              status: true
            },
          },
          {
            path: 'new/:id',
            component: NewRolComponent,
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
