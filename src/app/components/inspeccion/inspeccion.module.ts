import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspeccionRoutingModule } from './inspeccion-routing.module';
import { ListComponent } from './list/list.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    InspeccionRoutingModule
  ],
  declarations: [
    ListComponent
  ]
})
export class InspeccionModule { }
