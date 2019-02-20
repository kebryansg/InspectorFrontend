import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import {ListComponent} from './list/list.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import {AgmCoreModule} from '@agm/core';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    AgmCoreModule,
    DeviceRoutingModule,
    AngularFirestoreModule,
  ],
  declarations: [
    ListComponent,
    UbicacionComponent
  ]
})
export class DeviceModule { }
