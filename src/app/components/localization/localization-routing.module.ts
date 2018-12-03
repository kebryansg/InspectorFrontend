import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProvinciaComponent} from './provincia/provincia.component';
import {CantonComponent} from './canton/canton.component';
import {ParroquiaComponent} from './parroquia/parroquia.component';
import {SectorComponent} from './sector/sector.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'provincia',
        component: ProvinciaComponent,
        data: {
          title: 'Provincia',
          status: true
        }
      },
      {
        path: 'canton',
        component: CantonComponent,
        data: {
          title: 'Provincia',
          status: true
        }
      },
      {
        path: 'parroquia',
        component: ParroquiaComponent,
        data: {
          title: 'Provincia',
          status: true
        }
      },
      {
        path: 'sector',
        component: SectorComponent,
        data: {
          title: 'Provincia',
          status: true
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalizationRoutingModule {
}
