import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspeccionRoutingModule } from './inspeccion-routing.module';
import { ListComponent } from './list/list.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewInspeccionComponent } from './new/new.component';
import { AsignColaboradorComponent } from './list/asign/asign.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    InspeccionRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  declarations: [
    ListComponent,
    NewInspeccionComponent,
    AsignColaboradorComponent,
  ],
  entryComponents:[
    AsignColaboradorComponent,
  ],
  providers: [
    AngularFireDatabase
  ]
})
export class InspeccionModule { }
