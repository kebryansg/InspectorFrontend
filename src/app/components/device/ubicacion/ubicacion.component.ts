import {Component, OnInit} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {CrudService} from '../../../shared/services/crud.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styles: [
    'agm-map { height: 550px; }'
  ]
})
export class UbicacionComponent implements OnInit {

  lsDispositivos: any[] = [];
  lsDeviceNombre: any[] = [];

  constructor(private firestoreCollection: AngularFirestore,
              private crudService: CrudService) {

  }

  async ngOnInit() {
    this.lsDeviceNombre = await this.crudService.SeleccionarAsync('list_device') as any[];
    this.firestoreCollection.collection('ubicacion')
      .valueChanges()
      .pipe(
        map((rows: any[]) => {
          return rows.map(row => {
            let device = this.lsDeviceNombre.find(device => device.MAC == row.id);
            return {
              lat: row.GPS.Latitud,
              lng: row.GPS.Longitud,
              label: `${ device.Nombre } (${ moment(row.Fecha).format('YYYY-MM-DD h:mm:ss') })`
            };
          })
        })
      )
      .subscribe((response: any) => {
        this.lsDispositivos = [...response];
      });
  }

}
