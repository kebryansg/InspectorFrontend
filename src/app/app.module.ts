import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MenuItems} from './shared/menu-items/menu-items';
import {BreadcrumbsComponent} from './layout/admin/breadcrumbs/breadcrumbs.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {DragulaModule} from 'ng2-dragula';
import {UiSwitchModule} from 'ng2-ui-switch';
import {NouisliderModule} from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {CatalogoModule} from './components/catalogo/catalogo.module';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragulaModule.forRoot(),
    UiSwitchModule,
    NouisliderModule,
    TagInputModule,
    SharedModule,
    CatalogoModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  schemas: [],
  providers: [
    MenuItems,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
