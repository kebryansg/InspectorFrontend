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
import { ViewInspeccionComponent } from './list/view/view.component';
import {LightboxModule} from 'angular2-lightbox';
import {UiSwitchModule} from 'ng2-ui-switch/dist';
import { WebInspeccionComponent } from './web/web.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    UiSwitchModule,
    ReactiveFormsModule,
    InspeccionRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    LightboxModule,
  ],
  declarations: [
    ListComponent,
    NewInspeccionComponent,
    AsignColaboradorComponent,
    ViewInspeccionComponent,
    WebInspeccionComponent,
  ],
  entryComponents:[
    AsignColaboradorComponent,
  ],
  providers: [
    AngularFireDatabase
  ]
})
export class InspeccionModule { }
