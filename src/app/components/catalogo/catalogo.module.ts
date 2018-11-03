import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import {InstitucionComponent} from './institucion/institucion.component';
import {SharedModule} from '../../shared/shared.module';
import { CompaniaComponent } from './compania/compania.component';
import { TipoEmpresaComponent } from './tipo-empresa/tipo-empresa.component';
import { ActividadEconomicaComponent } from './actividad-economica/actividad-economica.component';
import { EntidadComponent } from './entidad/entidad.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CatalogoRoutingModule
  ],
  declarations: [ InstitucionComponent, CompaniaComponent, TipoEmpresaComponent, ActividadEconomicaComponent, EntidadComponent ]
})
export class CatalogoModule { }
