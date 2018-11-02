import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdvanceRoutingModule} from './advance-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ToastyConfig, ToastyService} from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    AdvanceRoutingModule,
    SharedModule
  ],
  declarations: [],
  providers: [  ]
})
export class AdvanceModule { }
