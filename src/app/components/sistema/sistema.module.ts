import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';
import { RolesComponent } from './roles/roles.component';
import { NewRolComponent } from './roles/new/new.component';
import {NewUsuarioComponent} from './usuario/new/new.component';

@NgModule({
  imports: [
    CommonModule,
    SistemaRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule
  ],
  declarations: [UsuarioComponent, RolesComponent, NewRolComponent, NewUsuarioComponent]
})
export class SistemaModule { }
