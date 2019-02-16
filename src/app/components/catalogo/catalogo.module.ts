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
import {EmpresaComponent} from './empresa/empresa.component';
import { PopupEmpresaComponent} from './empresa/popup/popup.component';
import { ModalEmpresaComponent } from './empresa/modal/modal.component';
import { NewEmpresaComponent } from './empresa/new/new.component';
import { ModalEntidadComponent } from './entidad/modal/modal.component';
import {AgmCoreModule} from '@agm/core';
import { GrupoComponent } from './grupo/grupo.component';
import { NewGrupoComponent } from './grupo/new/new.component';
import {  PopupActividadComponent } from './grupo/actividad/popup/popup.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PopupCategoriaComponent } from './categoria/popup/popup.component';
import { PopupGrupoComponent } from './grupo/popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CatalogoRoutingModule,
    NgxDatatableModule,
    SelectModule,
    CurrencyMaskModule,
    FormsModule,
    AgmCoreModule
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
    EmpresaComponent,
    PopupEmpresaComponent,
    ModalEmpresaComponent,
    NewEmpresaComponent,
    ModalEntidadComponent,
    GrupoComponent,
    NewGrupoComponent,
    PopupActividadComponent,
    CategoriaComponent,
    PopupCategoriaComponent,
    PopupGrupoComponent
  ],
  entryComponents: [
    PopupCompaniaComponent,
    PopupTipoEmpresaComponent,
    PopupActividadEconomicaComponent,
    PopupEntidadComponent,
    PopupDepartamentoComponent,
    PopupAreaComponent,
    PopupEmpresaComponent,
    ModalEmpresaComponent,
    ModalEntidadComponent,
    PopupActividadComponent,
    PopupCategoriaComponent,
    PopupGrupoComponent
  ]
})
export class CatalogoModule {
}
