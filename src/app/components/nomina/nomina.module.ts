import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NominaRoutingModule} from './nomina-routing.module';
import {CargoComponent} from './cargo/cargo.component';
import {ColaboradorComponent} from './colaborador/colaborador.component';
import {PopupCargoComponent} from './cargo/popup/popup.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { PopupColaboradorComponent } from './colaborador/popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NominaRoutingModule,
    NgxDatatableModule,
    // SelectModule,
    FormsModule
  ],
  declarations: [CargoComponent, ColaboradorComponent, PopupCargoComponent, PopupColaboradorComponent],
  entryComponents: [
    PopupCargoComponent,
    PopupColaboradorComponent
  ]
})
export class NominaModule {
}
