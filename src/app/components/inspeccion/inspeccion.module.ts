import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspeccionRoutingModule } from './inspeccion-routing.module';
import { ListComponent } from './list/list.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewInspeccionComponent } from './new/new.component';
import { AsignColaboradorComponent } from './list/asign/asign.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    InspeccionRoutingModule
  ],
  declarations: [
    ListComponent,
    NewInspeccionComponent,
    AsignColaboradorComponent,
  ],
  entryComponents:[
    AsignColaboradorComponent,
  ]
})
export class InspeccionModule { }
