import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NominaRoutingModule } from './nomina-routing.module';
import { CargoComponent } from './cargo/cargo.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { PopupCargoComponent } from './cargo/popup/popup.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {SelectModule} from 'ng-select';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NominaRoutingModule,
    NgxDatatableModule,
    NgxDatatableModule,
    // SelectModule,
    FormsModule
  ],
  declarations: [CargoComponent, ColaboradorComponent, PopupCargoComponent]
})
export class NominaModule { }
