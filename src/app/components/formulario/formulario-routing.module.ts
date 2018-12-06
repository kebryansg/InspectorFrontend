import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListaFormularioComponent} from './lista-formulario/lista-formulario.component';
import {FormularioComponent} from './formulario/formulario.component';
import {SeccionComponent} from './catalogo/seccion/seccion.component';
import {ComponenteComponent} from './catalogo/componente/componente.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListaFormularioComponent,
        data: {
          title: 'Formulario',
          status: true
        }
      },
      {
        path: 'new',
        component: FormularioComponent,
        data: {
          title: 'Nuevo Formulario',
          status: true
        }
      },
      {
        path: 'catalogo',
        children: [
          {
            path: 'seccion',
            component: SeccionComponent,
            data: {
              title: 'Sección',
              status: true
            }
          },
          {
            path: 'componente',
            component: ComponenteComponent,
            data: {
              title: 'Componentes',
              status: true
            }
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioRoutingModule { }
