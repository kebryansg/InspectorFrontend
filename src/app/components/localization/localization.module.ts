import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalizationRoutingModule } from './localization-routing.module';
import { ProvinciaComponent } from './provincia/provincia.component';
import { CantonComponent } from './canton/canton.component';
import { ParroquiaComponent } from './parroquia/parroquia.component';
import { SectorComponent } from './sector/sector.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import { PopupProvinciaComponent } from './provincia/popup/popup.component';
import { PopupCantonComponent } from './canton/popup/popup.component';
import { PopupParroquiaComponent } from './parroquia/popup/popup.component';
import { PopupSectorComponent } from './sector/popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    LocalizationRoutingModule
  ],
  declarations: [
    ProvinciaComponent,
    CantonComponent,
    ParroquiaComponent,
    SectorComponent,
    PopupProvinciaComponent,
    PopupCantonComponent,
    PopupParroquiaComponent,
    PopupSectorComponent,
  ],
  entryComponents: [
    PopupProvinciaComponent,
    PopupCantonComponent,
    PopupParroquiaComponent,
    PopupSectorComponent,
  ]
})
export class LocalizationModule { }
