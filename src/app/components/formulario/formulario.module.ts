import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormularioRoutingModule} from './formulario-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import {ListaFormularioComponent} from './lista-formulario/lista-formulario.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ComponenteComponent } from './catalogo/componente/componente.component';
import { SeccionComponent } from './catalogo/seccion/seccion.component';
import { PopupComponenteComponent } from './catalogo/componente/popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    FormularioRoutingModule
  ],
  declarations: [
    ListaFormularioComponent,
    FormularioComponent,
    ComponenteComponent,
    SeccionComponent,
    PopupComponenteComponent,
  ],
  entryComponents: [
    PopupComponenteComponent,
  ]
})
export class FormularioModule {
}
