import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Advance Components',
      status: false
    },
    children: [
      {
        path: 'modal',
        loadChildren: './modal/modal.module#ModalModule'
      },
      {
        path: 'notifications',
        loadChildren: './notification/notification.module#NotificationModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceRoutingModule { }
