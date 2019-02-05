import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {CatalogoRoutingModule} from './catalogo-routing.module';
import {InstitucionComponent} from './institucion/institucion.component';
import {SharedModule} from '../../shared/shared.module';
import {CompaniaComponent} from './compania/compania.component';
import {TipoEmpresaComponent} from './tipo-empresa/tipo-empresa.component';
import {ActividadEconomicaComponent} from './actividad-economica/actividad-economica.component';
import {EntidadComponent} from './entidad/entidad.component';
import {SelectModule} from 'ng-select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {FormsModule} from '@angular/forms';
import {PopupCompaniaComponent} from './compania/popup/popup.component';
import {PopupTipoEmpresaComponent} from './tipo-empresa/popup/popup.component';
import {PopupActividadEconomicaComponent} from './actividad-economica/popup/popup.component';
import {PopupEntidadComponent} from './entidad/popup/popup.component';
import {DepartamentoComponent} from './departamento/departamento.component';
import {AreaComponent} from './area/area.component';
import {PopupDepartamentoComponent} from './departamento/popup/popup.component';
import {PopupAreaComponent} from './area/popup/popup.component';
import {ClasificacionComponent} from './clasificacion/clasificacion.component';
import {PopupClasificaconComponent} from './clasificacion/popup/popup.component';
import {EmpresaComponent} from './empresa/empresa.component';
import { PopupEmpresaComponent} from './empresa/popup/popup.component';
import { ModalEmpresaComponent } from './empresa/modal/modal.component';
import { NewEmpresaComponent } from './empresa/new/new.component';
import { ModalEntidadComponent } from './entidad/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CatalogoRoutingModule,
    NgxDatatableModule,
    SelectModule,
    CurrencyMaskModule,
    FormsModule
  ],
  declarations: [
    InstitucionComponent,
    CompaniaComponent,
    TipoEmpresaComponent,
    ActividadEconomicaComponent,
    EntidadComponent,
    PopupCompaniaComponent,
    PopupTipoEmpresaComponent,
    PopupActividadEconomicaComponent,
    PopupEntidadComponent,
    DepartamentoComponent,
    AreaComponent,
    PopupDepartamentoComponent,
    PopupAreaComponent,
    ClasificacionComponent,
    PopupClasificaconComponent,
    EmpresaComponent,
    PopupEmpresaComponent,
    ModalEmpresaComponent,
    NewEmpresaComponent,
    ModalEntidadComponent
  ],
  entryComponents: [
    PopupCompaniaComponent,
    PopupTipoEmpresaComponent,
    PopupActividadEconomicaComponent,
    PopupEntidadComponent,
    PopupDepartamentoComponent,
    PopupAreaComponent,
    PopupClasificaconComponent,
    PopupEmpresaComponent,
    ModalEmpresaComponent,
    ModalEntidadComponent
  ]
})
export class CatalogoModule {
}
