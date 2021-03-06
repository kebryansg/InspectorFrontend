import {NgModule, NO_ERRORS_SCHEMA, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToggleFullScreenDirective} from './fullscreen/toggle-fullscreen.directive';
import {AccordionAnchorDirective} from './accordion/accordionanchor.directive';
import {AccordionLinkDirective} from './accordion/accordionlink.directive';
import {AccordionDirective} from './accordion/accordion.directive';
import {HttpClientModule} from '@angular/common/http';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TitleComponent} from '../layout/admin/title/title.component';
import {CardComponent} from './card/card.component';
import {CardToggleDirective} from './card/card-toggle.directive';
import {ModalBasicComponent} from './modal-basic/modal-basic.component';
import {ModalAnimationComponent} from './modal-animation/modal-animation.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {DataFilterPipe} from './elements/data-filter.pipe';
import {CrudService} from './services/crud.service';
import { ReactiveFormsModule } from '@angular/forms';
import {ToolsService} from './services/tools.service';
import {ModalService} from './services/modal.service';
import { StatusPipe } from './pipes/status.pipe';
import {AutorizadoPipe} from './pipes/autorizado.pipe';
import { MomentPipe } from './pipes/moment.pipe';
import {ExportService} from './services/export.service';
import {httpInterceptorProviders} from '../http-interceptor';
import { KeysPipe } from './pipes/keys.pipe';
import {FcmService} from './services/fcm.service';
import { CardTabsComponent } from './card-tabs/card-tabs.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    ReactiveFormsModule
  ],
  exports: [
    NgbModule,
    ReactiveFormsModule,
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    HttpClientModule,
    PerfectScrollbarModule,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    ClickOutsideModule,
    DataFilterPipe,
    StatusPipe,
    AutorizadoPipe,
    MomentPipe,
    KeysPipe,
    CardTabsComponent
  ],
  declarations: [
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    DataFilterPipe,
    StatusPipe,
    AutorizadoPipe,
    MomentPipe,
    KeysPipe,
    CardTabsComponent
  ],
  providers: [
    CrudService,
    FcmService,
    ToolsService,
    ModalService,
    ExportService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    httpInterceptorProviders

  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
