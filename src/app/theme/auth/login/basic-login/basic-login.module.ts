import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLoginComponent } from './basic-login.component';
import {BasicLoginRoutingModule} from './basic-login-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    BasicLoginRoutingModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  declarations: [BasicLoginComponent]
})
export class BasicLoginModule { }
