import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormularioRoutingModule} from './formulario-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import {ListaFormularioComponent} from './lista-formulario/lista-formulario.component';
import { FormularioComponent } from './lista-formulario/formulario/formulario.component';
import { ComponenteComponent } from './catalogo/componente/componente.component';
import { SeccionComponent } from './catalogo/seccion/seccion.component';
import { PopupComponenteComponent } from './catalogo/componente/popup/popup.component';
import { PopupSeccionComponent } from './catalogo/seccion/popup/popup.component';
import { AsignSeccionComponent } from './catalogo/seccion/asign/asign.component';
import { DragulaModule } from 'ng2-dragula';
import { ArchwizardModule } from 'ng2-archwizard/dist';
import {UiSwitchModule} from 'ng2-ui-switch';
import { PopupFormularioComponent } from './lista-formulario/popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    DragulaModule.forRoot(),
    ArchwizardModule,
    UiSwitchModule,
    FormularioRoutingModule
  ],
  declarations: [
    ListaFormularioComponent,
    FormularioComponent,
    ComponenteComponent,
    SeccionComponent,
    PopupComponenteComponent,
    PopupSeccionComponent,
    AsignSeccionComponent,
    PopupFormularioComponent,
  ],
  entryComponents: [
    PopupComponenteComponent,
    PopupSeccionComponent,
    PopupFormularioComponent
  ]
})
export class FormularioModule {
}
