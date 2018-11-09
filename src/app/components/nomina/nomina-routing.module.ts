import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CargoComponent} from './cargo/cargo.component';
import {ColaboradorComponent} from './colaborador/colaborador.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cargo',
        component: CargoComponent,
        data: {
          title: 'Cargo',
          status: true
        }
      },
      {
        path: 'colaborador',
        component: ColaboradorComponent,
        data: {
          title: 'Colaborador',
          status: true
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominaRoutingModule {
}
