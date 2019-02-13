import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstitucionComponent} from './institucion/institucion.component';
import {CompaniaComponent} from './compania/compania.component';
import {EntidadComponent} from './entidad/entidad.component';
import {ActividadEconomicaComponent} from './actividad-economica/actividad-economica.component';
import {TipoEmpresaComponent} from './tipo-empresa/tipo-empresa.component';
import {DepartamentoComponent} from './departamento/departamento.component';
import {AreaComponent} from './area/area.component';
import {ClasificacionComponent} from './clasificacion/clasificacion.component';
import {EmpresaComponent} from './empresa/empresa.component';
import {NewEmpresaComponent} from './empresa/new/new.component';
import {GrupoComponent} from './grupo/grupo.component';
import {NewGrupoComponent} from './grupo/new/new.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'institucion',
        component: InstitucionComponent,
        data: {
          title: 'Institución',
          status: true
        }
      },
      {
        path: 'compania',
        component: CompaniaComponent,
        data: {
          title: 'Compañía',
          status: true
        }
      },
      {
        path: 'entidad',
        component: EntidadComponent,
        data: {
          title: 'Entidad',
          status: true
        }
      },
      {
        path: 'clasificacion',
        component: ClasificacionComponent,
        data: {
          title: 'Clasificación',
          status: true
        }
      },
      {
        path: 'empresa',
        children: [
          {
            path: '',
            component: EmpresaComponent,
            data: {
              title: 'Empresa',
              status: true
            }
          },
          {
            path: 'new',
            component: NewEmpresaComponent,
            data: {
              title: 'Empresa',
              status: true
            }
          },
          {
            path: 'new/:id',
            component: NewEmpresaComponent,
            data: {
              title: 'Empresa',
              status: true
            }
          },

        ]
      },
      {
        path: 'departamento',
        component: DepartamentoComponent,
        data: {
          title: 'Departamento',
          status: true
        }
      },
      {
        path: 'area',
        component: AreaComponent,
        data: {
          title: 'Área',
          status: true
        }
      },
      {
        path: 'actividad-economica',
        component: ActividadEconomicaComponent,
        data: {
          title: 'Actividad Económica',
          status: true
        }
      },
      {
        path: 'tipo-empresa',
        component: TipoEmpresaComponent,
        data: {
          title: 'Tipo Empresa',
          status: true
        }
      },
      {
        path: 'grupo',
        children: [
          {
            path: '',
            component: GrupoComponent,
            data: {
              title: 'Grupo Económico',
              status: true
            }
          },
          {
            path: 'new',
            component: NewGrupoComponent,
            data: {
              title: 'Config. Grupo Económico',
              status: true
            }
          },
          {
            path: 'new/:id',
            component: NewGrupoComponent,
            data: {
              title: 'Config. Grupo Económico',
              status: true
            }
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
