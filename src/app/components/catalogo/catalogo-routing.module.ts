import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstitucionComponent} from './institucion/institucion.component';
import {CompaniaComponent} from './compania/compania.component';
import {EntidadComponent} from './entidad/entidad.component';
import {ActividadEconomicaComponent} from './actividad-economica/actividad-economica.component';
import {TipoEmpresaComponent} from './tipo-empresa/tipo-empresa.component';
import {DepartamentoComponent} from './departamento/departamento.component';
import {AreaComponent} from './area/area.component';

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
          title: 'Compañia',
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
          title: 'Area',
          status: true
        }
      },
      {
        path: 'actividad-economica',
        component: ActividadEconomicaComponent,
        data: {
          title: 'Actividad Economica',
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
