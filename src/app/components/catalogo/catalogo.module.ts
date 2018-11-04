import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import {InstitucionComponent} from './institucion/institucion.component';
import {SharedModule} from '../../shared/shared.module';
import { CompaniaComponent } from './compania/compania.component';
import { TipoEmpresaComponent } from './tipo-empresa/tipo-empresa.component';
import { ActividadEconomicaComponent } from './actividad-economica/actividad-economica.component';
import { EntidadComponent } from './entidad/entidad.component';
import {SelectModule} from 'ng-select';
import {FormsModule} from '@angular/forms';
import { PopupComponent } from './compania/popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CatalogoRoutingModule,
    NgxDatatableModule,
    SelectModule,
    FormsModule
  ],
  declarations: [ InstitucionComponent, CompaniaComponent, TipoEmpresaComponent, ActividadEconomicaComponent, EntidadComponent, PopupComponent ],
  entryComponents: [ PopupComponent ]
})
export class CatalogoModule { }
