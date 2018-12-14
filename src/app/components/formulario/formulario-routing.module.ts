import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListaFormularioComponent} from './lista-formulario/lista-formulario.component';
import {FormularioComponent} from './lista-formulario/formulario/formulario.component';
import {SeccionComponent} from './catalogo/seccion/seccion.component';
import {ComponenteComponent} from './catalogo/componente/componente.component';
import {AsignSeccionComponent} from './catalogo/seccion/asign/asign.component';
import {ConfigFormularioComponent} from './lista-formulario/config/config.component';

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
        path: 'new/:id',
        component: FormularioComponent,
        data: {
          title: 'Nuevo Formulario',
          status: true
        }
      },
      {
        path: 'config/:id',
        component: ConfigFormularioComponent,
        data: {
          title: 'Configurar Formulario',
          status: true
        }
      },
      {
        path: 'catalogo',
        children: [
          {
            path: 'seccion',
            children: [
              {
                path: '',
                component: SeccionComponent,
                data: {
                  title: 'Sección',
                  status: true
                },
              },
              {
                path: 'asign',
                component: AsignSeccionComponent,
                data: {
                  title: 'Asignar Componentes',
                  status: true
                },
              }
            ]
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
export class FormularioRoutingModule {
}
